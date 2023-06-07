const express = require("express");
const { validateBody, auth, upload, passport } = require("../../middlewares");
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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/refresh", validateBody(schemas.refreshSchema), ctrl.refresh);
router.post("/logout", auth, ctrl.logout);
router.patch(
  "/user",
  auth,
  upload.single("avatar"),
  validateBody(schemas.updateUserSchema),
  ctrl.updateUser
);

module.exports = router;
