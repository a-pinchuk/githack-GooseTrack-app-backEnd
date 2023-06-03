const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceGetTasks = async (filter) => {
  const tasks = await modelTask.find(
    { date: { $regex: filter, $options: "i" } },
    "-createdAt -updatedAt -__v"
  );

  if (!tasks) {
    throw HttpError(400, "Unable to fetch Tasks");
  }

  return tasks;
};

module.exports = serviceGetTasks;
