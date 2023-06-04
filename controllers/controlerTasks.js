const expressAsyncHandler = require("express-async-handler");
const { tasksServices } = require("../services");
const { getCurentMonth } = require("../helpers/dataTime");

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

class ControlerTasks {
  getTasks = expressAsyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const filter = getFilter({ ...req.query });

    const tasks = await tasksServices.show(owner, filter);

    res.status(200).json({ code: 200, data: tasks, count: tasks.length });
  });

  getTaskById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await tasksServices.showById(id);
    res.status(200).json({ code: 200, data: task });
  });

  addTask = expressAsyncHandler(async (req, res) => {
    const { _id: owner } = req.user;
    const task = await tasksServices.add(owner, { ...req.body });

    res.status(201).json({ code: 201, data: task });
  });

  changeTask = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await tasksServices.change(id, { ...req.body });

    res.status(200).json({ code: 200, data: task });
  });

  changeCategoryTask = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await tasksServices.changeCategory(id, { ...req.body });

    res.status(200).json({ code: 200, data: task });
  });

  deleteTask = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await tasksServices.remove(id);

    res.status(200).json({ code: 200, data: review });
  });
}

const controlerTasks = new ControlerTasks();
module.exports = controlerTasks;
