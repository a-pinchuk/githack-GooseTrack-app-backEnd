const { HttpError, wrappedSendMail } = require('../../helpers');
const { User } = require('../../models');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  await wrappedSendMail({
    to: email,
    subject: 'Please confirm your email',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
  });

  return res.status(200).json({ message: 'Verification email sent' });
};

module.exports = resendVerifyEmail;
