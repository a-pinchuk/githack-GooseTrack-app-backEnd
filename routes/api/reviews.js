const express = require("express");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/review");

const ctrl = require("../../controllers/controlerReviews");

const router = express.Router();

router.get("/", auth, ctrl.getReviews);
router.get("/:id", auth, isValidId, ctrl.getReviewById);
router.post("/", auth, validateBody(schemas.schemaAddReview), ctrl.addReview);
router.put(
  "/:id",
  auth,
  isValidId,
  validateBody(schemas.schemaAddReview),
  ctrl.changeReview
);
router.delete("/:id", auth, isValidId, ctrl.deleteReview);

module.exports = router;
