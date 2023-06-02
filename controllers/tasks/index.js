const { ctrlWrapper } = require("../../helpers");
const getTasks = require("./getTasks");
const getTaskById = require("./getTaskById");
const addTask = require("./addTask");
const changeTask = require("./changeTask");
const changeCategoryTask = require("./changeCategoryTask");

const deleteTask = require("./deleteTask");

module.exports = {
  getTasks: ctrlWrapper(getTasks),
  getTaskById: ctrlWrapper(getTaskById),
  addTask: ctrlWrapper(addTask),
  changeTask: ctrlWrapper(changeTask),
  changeCategoryTask: ctrlWrapper(changeCategoryTask),
  deleteTask: ctrlWrapper(deleteTask),
};
