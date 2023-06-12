const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { FRONTEND_URL, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id } = req.user;
  const payload = { _id };

  try {
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(
      _id,
      { accessToken, refreshToken },
      { new: true }
    );

    res.redirect(
      `${FRONTEND_URL}?accessToken=${encodeURIComponent(
        accessToken
      )}&refreshToken=${encodeURIComponent(refreshToken)}`
    );
  } catch (err) {
    throw HttpError(400, { message: err.message });
  }
};

module.exports = googleAuth;
