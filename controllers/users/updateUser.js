const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  const { token, password, verificationToken, createdAt, updatedAt, ...updatedUser } =
    user.toObject();

  res.status(200).json({ message: 'UserInfo updated', user: updatedUser });
};

module.exports = updateUser;
