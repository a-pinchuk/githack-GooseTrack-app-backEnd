const expressAsyncHandler = require("express-async-handler");
const { usersServices } = require("../services");
const {
  HttpError,
  createPairToken,
  getPayloadRefreshToken,
} = require("../helpers");

const bcrypt = require("bcrypt");

const { FRONTEND_URL } = process.env;

class ControlerUsers {
  //
  // * currentUser.js
  currentUser = expressAsyncHandler(async (req, res) => {
    const { avatarUrl, name, email, phone, skype, birthday, createdAt } =
      req.user;

    res.status(200).json({
      code: 200,
      data: { avatarUrl, name, email, phone, skype, birthday, createdAt },
    });
  });

  // * googleAuth.js
  googleAuth = expressAsyncHandler(async (req, res) => {
    const { id } = req.user;
    const [accessToken, refreshToken] = createPairToken({ id });
    await usersServices.updateUserById(id, { accessToken, refreshToken });

    res.redirect(
      `${FRONTEND_URL}?accessToken=${refreshToken}&refreshToken=${refreshToken}`
    );
  });

  // * login.js
  login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await usersServices.findUser({ email });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
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
  logout = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;

    await usersServices.updateUserById(_id, {
      accessToken: "",
      refreshToken: "",
    });

    res.status(204).json({ message: "Successful logout" });
  });

  // * refresh.js
  refresh = expressAsyncHandler(async (req, res) => {
    const { refreshToken: token } = req.body;

    const { id } = getPayloadRefreshToken(token);

    const user = await usersServices.findUser({ refreshToken: token }, false);

    if (!user) {
      throw HttpError(403, "Invalid refresh token");
    }

    const [accessToken, refreshToken] = createPairToken({ id });

    await usersServices.updateUserById(user._id, {
      accessToken,
      refreshToken,
    });

    res.json({ accessToken, refreshToken });
  });

  // * register.js
  register = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await usersServices.findUser({ email }, false);

    if (user) {
      throw HttpError(409, "Email already in use");
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
  updateUser = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { email } = req.body;

    const userByEmail = await usersServices.findUser({ email }, false);

    if (userByEmail && String(userByEmail._id) !== String(_id)) {
      throw HttpError(409, "Email already in use");
    }

    const avatarUrl = req.file?.path;

    const updatedFields = {
      ...req.body,
      ...(avatarUrl && { avatarUrl: avatarUrl }), // add avatarUrl if it's defined
    };

    const user = await usersServices.updateUserById(_id, updatedFields, false);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    const { token, password, verificationToken, updatedAt, ...updatedUser } =
      user.toObject();

    res.status(200).json({ message: "UserInfo updated", user: updatedUser });
  });
}

const controlerUsers = new ControlerUsers();
module.exports = controlerUsers;
