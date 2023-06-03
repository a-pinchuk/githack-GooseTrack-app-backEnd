const { modelTask } = require("../../models/task");

const { HttpError } = require("../../helpers");

const serviceGetTaskById = async (id) => {
  const task = await modelTask.findById(id, "-createdAt -updatedAt -__v");

  if (!task) {
    throw HttpError(400, "Unable to find Task");
  }

  return task;
};

module.exports = serviceGetTaskById;
