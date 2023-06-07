const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");
const passport = require("./google-authenticate");

module.exports = {
  auth,
  validateBody,
  isValidId,
  upload,
  passport,
};
