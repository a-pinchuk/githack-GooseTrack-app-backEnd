const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(
    user._id,
    { accessToken, refreshToken },
    { new: true }
  );

  const {
    password: _password,
    token: _token,
    verificationToken,
    createdAt,
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
};

module.exports = login;
