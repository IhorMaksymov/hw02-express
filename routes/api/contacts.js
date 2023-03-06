const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  remove
} = require('../../controllers/contactsControllers');

const {
  isValidId,
  validateBody,
  authCurrent
} = require('../../middlewares');

const { scheme, updateFavoriteById } = require('../../schema/contactSchema');

router.get('/', authCurrent, listContacts);

router.get('/:id', isValidId, getContactById);

router.post('/', authCurrent, validateBody(scheme), addContact);

router.put('/:id', isValidId, validateBody(scheme), updateContact);

router.patch('/:id/favorite', isValidId, validateBody(updateFavoriteById), updateFavorite);

router.delete('/:id', isValidId, remove);

module.exports = router