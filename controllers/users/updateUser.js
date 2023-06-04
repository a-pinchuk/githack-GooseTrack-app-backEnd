const { HttpError } = require('../../helpers');
const { User } = require('../../models');
const path = require('path');
const Jimp = require('jimp');

const updateUser = async (req, res) => {
  const { _id } = req.user;

  let avatarUrl;
  if (req.file) {
    const { filename } = req.file;
    const newFileName = `${_id}_${filename}`;

    const tmpPath = path.resolve(__dirname, '../../tmp', filename);
    const avatarsDir = path.resolve(__dirname, '../../public/avatars', newFileName);

    const image = await Jimp.read(tmpPath);
    await image
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .writeAsync(avatarsDir); // save;

    avatarUrl = path.join('avatars', newFileName);
  }

  const updatedFields = {
    ...req.body,
    ...(avatarUrl && { avatarUrl: avatarUrl }), // add avatarUrl if it's defined
  };

  const user = await User.findByIdAndUpdate(_id, updatedFields, { new: true });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  const { token, password, verificationToken, createdAt, updatedAt, ...updatedUser } =
    user.toObject();

  res.status(200).json({ message: 'UserInfo updated', user: updatedUser });
};

module.exports = updateUser;
