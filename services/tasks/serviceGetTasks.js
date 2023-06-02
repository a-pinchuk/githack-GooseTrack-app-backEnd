const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceGetTasks = async () => {
  const tasks = await modelTask.find({});

  if (!tasks) {
    throw HttpError(400, "Unable to fetch Tasks");
  }

  return tasks;
};

module.exports = serviceGetTasks;
