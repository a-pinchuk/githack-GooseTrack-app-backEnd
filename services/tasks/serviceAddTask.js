const { modelTask } = require("../../models/task");
const { HttpError } = require("../../helpers");

const serviceAddTasks = async (data) => {
  const tasks = await modelTask.create(data);

  if (!tasks) {
    throw HttpError(400, "Unable to save in DataBase");
  }
  const { createdAt, updatedAt, __v, ...createdTask } = tasks.toObject();

  return createdTask;
};

module.exports = serviceAddTasks;
