const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      throw HttpError(403, 'Invalid refresh token');
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '2m',
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '7d',
    });

    // update the refreshToken in the database
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    throw HttpError(403, err.message);
  }
};

module.exports = refresh;
