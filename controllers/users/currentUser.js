const currentUser = async (req, res) => {
  const { avatarUrl, name, email, phone, skype, birthday } = req.user;

  res.status(200).json({
    avatarUrl,
    name,
    email,
    phone,
    skype,
    birthday,
  });
};

module.exports = currentUser;
