const { serviceChangeTasks } = require("../../services/tasks");

const changeTask = async (req, res) => {
  const { id } = req.params;
  const task = await serviceChangeTasks(id, { ...req.body });
  res.status(200).json({ code: 200, data: task });
};

module.exports = changeTask;
