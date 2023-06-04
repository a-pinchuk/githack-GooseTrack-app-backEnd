const express = require("express");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/task");

const ctrl = require("../../controllers/controlerTasks");

const router = express.Router();

// * Get tasks
router.get("/", auth, ctrl.getTasks);

// * Get tasks by ID
router.get("/:id", auth, isValidId, ctrl.getTaskById);

// * ADD task
router.post("/", auth, validateBody(schemas.schemaAddTask), ctrl.addTask);

// * Change task
router.put(
  "/:id",
  auth,
  isValidId,
  validateBody(schemas.schemaAddTask),
  ctrl.changeTask
);

// * Change Category task
router.patch(
  "/:id/category",
  auth,
  isValidId,
  validateBody(schemas.schemaChangeCategoryTask),
  ctrl.changeCategoryTask
);

// * Delete task
router.delete("/:id", auth, isValidId, ctrl.deleteTask);

module.exports = router;
