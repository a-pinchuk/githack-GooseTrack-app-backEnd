const express = require('express');
const { validateBody, auth, uploadCloud, passport } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/controlerUsers');

const router = express.Router();

router.get('/current', auth, ctrl.currentUser);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrl.googleAuth
);
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/refresh', validateBody(schemas.refreshSchema), ctrl.refresh);
router.post('/logout', auth, ctrl.logout);
router.post('/forgot', ctrl.forgotPassword);
router.post('/reset-password', ctrl.resetPassword);
router.patch(
  '/user',
  auth,
  uploadCloud.single('avatar'),
  validateBody(schemas.updateUserSchema),
  ctrl.updateUser
);

module.exports = router;
