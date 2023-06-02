const serviceGetTasks = require("./serviceGetTasks");
const serviceAddTasks = require("./serviceAddTask");
const serviceGetTaskById = require("./serviceGetTaskById");
const serviceDeleteTask = require("./serviceDeleteTask");
const serviceChangeTasks = require("./serviceChangeTasks");
const serviceChangeCategoryTasks = require("./serviceChangeCategoryTasks");

module.exports = {
  serviceGetTasks,
  serviceAddTasks,
  serviceGetTaskById,
  serviceDeleteTask,
  serviceChangeTasks,
  serviceChangeCategoryTasks,
};
