const express = require("express");
const { validateBody, auth, uploadCloud } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.get("/current", auth, ctrl.currentUser);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", auth, ctrl.logout);
// router.patch("/avatar", auth, uploadCloud.single("avatar"), ctrl.updateAvatar);
router.patch(
  "/user",
  auth,
  uploadCloud.single("avatar"),
  validateBody(schemas.updateUserSchema),
  ctrl.updateUser
);

module.exports = router;
