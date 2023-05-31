const { User } = require('../../models');
const { HttpError, wrappedSendMail } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarUrl = gravatar.url(email);

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = v4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationToken,
  });

  await wrappedSendMail({
    to: email,
    subject: 'Please confirm your email',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register,
};
