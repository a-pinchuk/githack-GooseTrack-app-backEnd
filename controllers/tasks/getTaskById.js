const { serviceGetTaskById } = require("../../services/tasks");

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await serviceGetTaskById(id);

  res.status(200).json({ code: 200, data: task });
};

module.exports = getTaskById;
