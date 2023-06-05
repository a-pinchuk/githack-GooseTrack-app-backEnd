const expressAsyncHandler = require("express-async-handler");
const { usersServices } = require("../services");

class ControlerUsers {
  currentUser = expressAsyncHandler(async (req, res) => {
    const { avatarUrl, name, email, phone, skype, birthday } = req.user;

    res.status(200).json({
      code: 200,
      data: { avatarUrl, name, email, phone, skype, birthday },
    });
  });

  verifyEmail = expressAsyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    const tasks = await tasksServices.show(owner, filter);

    res.status(200).json({ code: 200, data: tasks, count: tasks.length });
  });

  // verifyEmail
  // resendVerifyEmail
  // register
  // login
  // logout
  // updateUser
}

const controlerUsers = new ControlerUsers();
module.exports = controlerUsers;
