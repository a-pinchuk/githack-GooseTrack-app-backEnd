const HttpError = require("./HttpError");
const ctrlWrapper = require("./ctrlWrapper");
const handleMongooseError = require("./handleMongooseError");
const sendMail = require("./sendMail");
const {
  createPairToken,
  getPayloadRefreshToken,
  getPayloadAccessToken,
} = require("./crypto");
const wrappedSendMail = ctrlWrapper(sendMail);

module.exports = {
  HttpError,
  ctrlWrapper,
  handleMongooseError,
  wrappedSendMail,
  createPairToken,
  getPayloadRefreshToken,
  getPayloadAccessToken,
};
