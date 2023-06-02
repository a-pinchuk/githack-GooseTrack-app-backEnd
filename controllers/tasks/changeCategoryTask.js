const { serviceChangeCategoryTasks } = require("../../services/tasks");

const changeCategoryTask = async (req, res) => {
  const { id } = req.params;
  const task = await serviceChangeCategoryTasks(id, { ...req.body });
  res.status(200).json({ code: 200, data: task });
};

module.exports = changeCategoryTask;
