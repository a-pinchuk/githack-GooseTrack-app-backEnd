const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers/HttpError');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = {
  getContactById,
};
