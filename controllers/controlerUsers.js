const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const { usersServices } = require('../services');
const {
  HttpError,
  createPairToken,
  getPayloadRefreshToken,
  wrappedSendMail,
} = require('../helpers');

const bcrypt = require('bcrypt');

const { FRONTEND_URL } = process.env;

class ControlerUsers {
  //
  // * currentUser.js
  currentUser = expressAsyncHandler(async (req, res, next) => {
    const { avatarUrl, name, email, phone, skype, birthday, createdAt } = req.user;

    res.status(200).json({
      avatarUrl,
      name,
      email,
      phone,
      skype,
      birthday,
      createdAt,
    });
  });

  // * googleAuth.js
  googleAuth = expressAsyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const [accessToken, refreshToken] = createPairToken({ _id });
    await usersServices.updateUserById(_id, { accessToken, refreshToken });

    res.redirect(
      `${FRONTEND_URL}?accessToken=${encodeURIComponent(
        accessToken
      )}&refreshToken=${encodeURIComponent(refreshToken)}`
    );
  });

  // * login.js
  login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await usersServices.findUser({ email });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, 'Email or password invalid');
    }

    const [accessToken, refreshToken] = createPairToken({ id: user._id });

    await usersServices.updateUserById(user._id, { accessToken, refreshToken });

    const {
      password: _password,
      token: _token,
      verificationToken,
      updatedAt,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
      ...updatedUser
    } = user.toObject();

    res.json({
      accessToken,
      refreshToken,
      user: updatedUser,
    });
  });

  // * logout.js
  logout = expressAsyncHandler(async (req, res, next) => {
    const { _id } = req.user;

    await usersServices.updateUserById(_id, {
      accessToken: '',
      refreshToken: '',
    });

    res.status(204).json({ message: 'Successful logout' });
  });

  // * refresh.js
  refresh = expressAsyncHandler(async (req, res, next) => {
    const { refreshToken: token } = req.body;

    const { id } = getPayloadRefreshToken(token);

    const user = await usersServices.findUser({ refreshToken: token }, false);

    if (!user) {
      throw HttpError(403, 'Invalid refresh token');
    }

    const [accessToken, refreshToken] = createPairToken({ id });

    await usersServices.updateUserById(user._id, {
      accessToken,
      refreshToken,
    });

    res.json({ accessToken, refreshToken });
  });

  // * register.js
  register = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await usersServices.findUser({ email }, false);

    if (user) {
      throw HttpError(409, 'Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await usersServices.createUser({
      ...req.body,
      password: hashPassword,
    });

    const [accessToken, refreshToken] = createPairToken({ id: newUser._id });

    await usersServices.updateUserById(newUser._id, {
      accessToken,
      refreshToken,
    });

    const {
      password: _password,
      token: _token,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
      verificationToken,
      updatedAt,
      ...updatedUser
    } = newUser.toObject();

    res.json({
      accessToken,
      refreshToken,
      user: updatedUser,
    });
  });

  //  * updateUser.js
  updateUser = expressAsyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { email } = req.body;

    const userByEmail = await usersServices.findUser({ email }, false);

    if (userByEmail && String(userByEmail._id) !== String(_id)) {
      throw HttpError(409, 'Email already in use');
    }

    const avatarUrl = req.file?.path;

    const updatedFields = {
      ...req.body,
      ...(avatarUrl && { avatarUrl: avatarUrl }), // add avatarUrl if it's defined
    };

    const user = await usersServices.updateUserById(_id, updatedFields, false);

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const { token, password, verificationToken, updatedAt, ...updatedUser } = user.toObject();

    res.status(200).json({ message: 'UserInfo updated', user: updatedUser });
  });

  // * forgotPassword
  forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await usersServices.findUser({ email });

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_RESET, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;

    await user.save();

    const resetUrl = `https://a-pinchuk.github.io/githack-GooseTrack-app/reset-password/${resetToken}`;

    await wrappedSendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested for a password reset, kindly use this 
              <a href="${resetUrl}">link</a> to reset your password. <br/> 
              This link is only valid for the next 1 hour.</p>`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  };

  // * resetPassword
  resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw HttpError(400, 'Token and new password are required');
    }

    const decoded = jwt.verify(token, process.env.JWT_RESET);
    const user = await usersServices.findUser({ _id: decoded.id, resetPasswordToken: token });

    if (!user) {
      throw HttpError(400, 'Token is invalid or has expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  };
}

const controlerUsers = new ControlerUsers();
module.exports = controlerUsers;
