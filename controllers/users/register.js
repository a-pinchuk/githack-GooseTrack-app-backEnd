const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = { id: newUser._id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(
    newUser._id,
    { accessToken, refreshToken },
    { new: true }
  );

  const {
    password: _password,
    token: _token,
    accessToken: _accessToken,
    refreshToken: _refreshToken,
    verificationToken,
    createdAt,
    updatedAt,
    ...updatedUser
  } = newUser.toObject();

  res.json({
    accessToken,
    refreshToken,
    user: updatedUser,
  });
};

module.exports = register;
