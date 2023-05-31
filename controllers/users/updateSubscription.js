const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateSubscription = async (req, res) => {
  const validSubscriptions = ['starter', 'pro', 'business'];
  const { _id } = req.user;
  const newSubscription = req.body.subscription;

  if (!validSubscriptions.includes(newSubscription)) {
    throw HttpError(400, 'Invalid subscription value');
  }

  const user = await User.findByIdAndUpdate(_id, { subscription: newSubscription }, { new: true });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({ message: 'Subscription updated', user });
};

module.exports = {
  updateSubscription,
};
