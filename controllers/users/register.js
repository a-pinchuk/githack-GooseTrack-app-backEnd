const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');
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

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  console.log('🚀 ~ payload:', payload);

  await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  res.status(201).json({
    email: newUser.email,
    token,
  });
};

module.exports = register;
