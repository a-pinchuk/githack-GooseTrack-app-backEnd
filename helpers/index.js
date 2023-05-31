const { HttpError } = require('../helpers/HttpError');
const { ctrlWrapper } = require('../helpers/ctrlWrapper');
const { handleMongooseError } = require('../helpers/handleMongooseError');
const sendMail = require('./sendMail');

const wrappedSendMail = ctrlWrapper(sendMail);

module.exports = {
  HttpError,
  ctrlWrapper,
  handleMongooseError,
  wrappedSendMail,
};
