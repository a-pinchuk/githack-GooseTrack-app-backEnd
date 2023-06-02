const HttpError = require("./HttpError");
const ctrlWrapper = require("./ctrlWrapper");
const handleMongooseError = require("./handleMongooseError");
const sendMail = require("./sendMail");

const wrappedSendMail = ctrlWrapper(sendMail);

module.exports = {
  HttpError,
  ctrlWrapper,
  handleMongooseError,
  wrappedSendMail,
};
