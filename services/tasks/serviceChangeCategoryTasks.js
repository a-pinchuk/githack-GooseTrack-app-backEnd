const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceChangeCategoryTasks = async (id, data) => {
  const task = await modelTask.findByIdAndUpdate(id, data, { new: true });

  if (!task) {
    throw HttpError(400, "Unable to find Task");
  }

  return task;
};

module.exports = serviceChangeCategoryTasks;
