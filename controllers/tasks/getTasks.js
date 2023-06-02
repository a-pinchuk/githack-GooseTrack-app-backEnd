const { serviceGetTasks } = require("../../services/tasks");

const getTasks = async (req, res) => {
  const tasks = await serviceGetTasks();

  res.status(200).json({ code: 200, data: tasks });
};

module.exports = getTasks;
