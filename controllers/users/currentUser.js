const currentUser = async (req, res) => {
  const { token } = req.user;

  res.status(200).json({
    token,
  });
};

module.exports = currentUser;
