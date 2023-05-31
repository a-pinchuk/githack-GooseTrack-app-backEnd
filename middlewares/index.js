const { validateBody } = require('./validateBody');
const isValidId = require('./isValidId');
const { auth } = require('./auth');
const upload = require('./upload');

module.exports = {
  auth,
  validateBody,
  isValidId,
  upload,
};
