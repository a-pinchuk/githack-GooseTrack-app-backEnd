const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceDeleteTask = async (id) => {
  const task = await modelTask.findByIdAndDelete(id);

  if (!task) {
    throw HttpError(400, "Unable to find Task");
  }

  return task;
};

module.exports = serviceDeleteTask;