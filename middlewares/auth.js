const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const auth = async (req, res, next) => {
  const { ACCESS_SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = auth;
