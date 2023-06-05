const express = require("express");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/review");

const ctrl = require("../../controllers/controlerReviews");

const router = express.Router();

router.get("/", ctrl.getAllReviews);

router.get("/my-reviews", auth, ctrl.getReviews);
router.get("/my-reviews/:id", auth, isValidId, ctrl.getReviewById);
router.post(
  "/my-reviews",
  auth,
  validateBody(schemas.schemaAddReview),
  ctrl.addReview
);
router.put(
  "/my-reviews/:id",
  auth,
  isValidId,
  validateBody(schemas.schemaAddReview),
  ctrl.changeReview
);
router.delete("/my-reviews/:id", auth, isValidId, ctrl.deleteReview);

module.exports = router;
