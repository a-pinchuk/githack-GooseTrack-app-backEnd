const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  const owner = req.user.id;
  const avatarURL = req.file.path;
  const user = await User.findByIdAndUpdate(
    owner,
    { avatarUrl: avatarURL },
    { new: true }
  );

  res.json(user.avatarUrl);
};

module.exports = updateAvatar;
