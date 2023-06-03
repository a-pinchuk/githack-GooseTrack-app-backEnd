const { serviceGetTasks } = require("../../services/tasks");
const { getCurentMonth } = require("../../helpers/dataTime");

const getFilter = (params) => {
  const { day, month } = params;

  let filter = "";
  if (day) {
    filter = day;
  } else if (month) {
    filter = month.slice(0, 8);
  } else {
    filter = getCurentMonth();
  }

  return filter;
};

const getTasks = async (req, res) => {
  const filter = getFilter({ ...req.query });

  console.log("filter", filter);

  const tasks = await serviceGetTasks(filter);

  res.status(200).json({ code: 200, data: tasks, count: tasks.length });
};

module.exports = getTasks;
