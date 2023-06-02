const { serviceAddTasks } = require("../../services/tasks");

const addTask = async (req, res) => {
  const task = await serviceAddTasks({ ...req.body });

  res.status(200).json({ code: 200, data: task });
};

module.exports = addTask;
