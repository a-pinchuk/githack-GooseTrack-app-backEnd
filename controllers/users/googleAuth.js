const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { FRONTEND_URL, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { id } = req.user;
  const payload = { id };

  try {
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.redirect(
      `${FRONTEND_URL}?accessToken=${refreshToken}&refreshToken=${refreshToken}`
    );
  } catch (err) {
    throw HttpError(400, { message: err.message });
  }
};

module.exports = googleAuth;
