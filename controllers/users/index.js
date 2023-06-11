const { ctrlWrapper } = require('../../helpers');
const register = require('./register');
const googleAuth = require('./googleAuth');
const refresh = require('./refresh');
const login = require('./login');
const logout = require('./logout');
const currentUser = require('./currentUser');
const updateUser = require('./updateUser');

module.exports = {
  register: ctrlWrapper(register),
  googleAuth: ctrlWrapper(googleAuth),
  refresh: ctrlWrapper(refresh),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  updateUser: ctrlWrapper(updateUser),
};
