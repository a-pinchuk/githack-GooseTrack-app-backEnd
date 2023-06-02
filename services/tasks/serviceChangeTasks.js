const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceChangeTasks = async (id, data) => {
  const task = await modelTask.findByIdAndUpdate(id, data, {
    new: true,
    // runValidators: true,
  });

  if (!task) {
    throw HttpError(400, "Unable to find Task");
  }

  return task;
};

module.exports = serviceChangeTasks;
