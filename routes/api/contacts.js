const express = require('express');
const { isValidId } = require('../../middlewares');

const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { validateBody, auth } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', auth, ctrl.getAll);
router.get('/:contactId', auth, isValidId, ctrl.getContactById);
router.post('/', auth, validateBody(schemas.addSchema), ctrl.add);
router.delete('/:contactId', auth, isValidId, ctrl.deleteContact);
router.put('/:contactId', auth, isValidId, validateBody(schemas.addSchema), ctrl.update);
router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
