const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/task");

const ctrl = require("../../controllers/tasks");

const router = express.Router();

// TODO  add auth

// * Get tasks
// router.get("/", auth, ctrl.getTasks);
router.get("/", ctrl.getTasks);

// * Get tasks by ID
router.get("/:id", isValidId, ctrl.getTaskById);

// * ADD task
router.post("/", validateBody(schemas.schemaAddTask), ctrl.addTask);

// * Change task
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.schemaAddTask),
  ctrl.changeTask
);

// * Change Category task
router.patch(
  "/:id/category",
  isValidId,
  validateBody(schemas.schemaChangeCategoryTask),
  ctrl.changeCategoryTask
);

// * Delete task
router.delete("/:id", isValidId, ctrl.deleteTask);

module.exports = router;
