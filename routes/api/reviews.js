const express = require("express");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/review");

const ctrl = require("../../controllers/tasks");

const router = express.Router();

router.get("/", auth, ctrl.getRevies);
router.get("/:id", auth, isValidId, ctrl.getRevieById);
router.post("/", auth, validateBody(schemas.schemaAddReview), ctrl.addRevie);
router.put(
  "/:id",
  auth,
  isValidId,
  validateBody(schemas.schemaAddReview),
  ctrl.changeRevie
);

router.delete("/:id", auth, isValidId, ctrl.deleteRevie);

module.exports = router;
