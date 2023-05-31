const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(400, 'Verify token is not valid');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  return res.status(200).json({ message: 'Verification successful' });
};

module.exports = verifyEmail;
