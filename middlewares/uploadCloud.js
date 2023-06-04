const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  CLOUDNERY_API_NAME,
  CLOUDNERY_API_KEY,
  CLOUDNERY_API_SECRET,
  // CLOUDINARY_URL,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDNERY_API_NAME,
  api_key: CLOUDNERY_API_KEY,
  api_secret: CLOUDNERY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Avatars",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [
      {
        width: 200,
        height: 200,
      },
    ],
  },
  folder: "avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadCloud = multer({ storage });

module.exports = uploadCloud;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dirPath = path.resolve(__dirname, "../tmp");
//     cb(null, dirPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Math.random() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// async function resizeAvatar(req, res, next) {
//   const { path } = req.file;

//   try {
//     const avatar = await Jimp.read(path);
//     const resizedAvatar = avatar.resize(250, 250);
//     await resizedAvatar.writeAsync(path);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
//   next();
// }

// module.exports = { upload, resizeAvatar };
