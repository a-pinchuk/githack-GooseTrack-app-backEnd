const path = require('path');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const Jimp = require('jimp');

const updateAvatar = async (req, res, next) => {
  const { filename } = req.file;
  const { _id } = req.user;
  const newFileName = `${_id}_${filename}`;

  if (!filename) {
    throw HttpError(400, 'File is require!');
  }

  const tmpPath = path.resolve(__dirname, '../../tmp', filename);
  const avatarsDir = path.resolve(__dirname, '../../public/avatars', newFileName);

  const image = await Jimp.read(tmpPath);
  await image
    .resize(250, 250) // resize
    .quality(60) // set JPEG quality
    .writeAsync(avatarsDir); // save;

  const avatarUrl = path.join('avatars', newFileName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = {
  updateAvatar,
};
