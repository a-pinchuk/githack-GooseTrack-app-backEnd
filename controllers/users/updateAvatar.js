// const { User } = require("../../models");

const updateAvatar = async (req, res) => {
  console.log("req.file.path :", req.file.path);

  // const owner = req.user.id;
  // const petData = req.body;
  // const data = !req.file
  //   ? { avatarURL: req.file.path, owner, ...petData }
  //   : { owner, ...petData };
  const avatarURL = req.file.path;

  // Pet.create(data)
  //   .then((pet) => {
  //     if (pet) {
  //       User.findByIdAndUpdate(owner, { $push: { userPets: pet._id } })
  //         .then((user) => {
  //           if (user) {
  //             res.status(201).json({ success: true, pet });
  //           }
  //         })
  //         .catch((err) => {
  //           throw new Error(err);
  //         });
  //     }
  //   })
  //   .catch((err) =>
  //     res.status(400).json({ success: false, error: err, message: err.message })
  //   );

  res.json(avatarURL);
};

module.exports = updateAvatar;
