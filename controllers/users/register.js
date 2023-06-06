const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = v4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const payload = { userId: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    email: newUser.email,
    token,
  });
};

module.exports = register;
