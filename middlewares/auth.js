const { HttpError, getPayloadAccessToken } = require("../helpers");
const { usersServices } = require("../services");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = getPayloadAccessToken(token);

    const user = await usersServices.findUserById(id);

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
