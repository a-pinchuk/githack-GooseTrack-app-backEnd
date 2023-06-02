const { serviceDeleteTask } = require("../../services/tasks");

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await serviceDeleteTask(id);

  res.status(200).json({ code: 200, data: task });
};

module.exports = deleteTask;
