const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  if (favorite !== undefined) {
    query.favorite = favorite === 'true';
  }
  const result = await Contact.find(query).skip(skip).limit(limit).populate('owner', 'name email');
  res.json(result);
};

module.exports = {
  getAll,
};
