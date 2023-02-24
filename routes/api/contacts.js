const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  remove
} = require('../../controllers');

const {
  isValidId,
  validateBody,
} = require('../../middlewares');

const { scheme, updateFavoriteById } = require('../../schema/contactSchema');

router.get('/', listContacts);

router.get('/:id', isValidId, getContactById);

router.post('/', validateBody(scheme), addContact);

router.put('/:id', isValidId, validateBody(scheme), updateContact);

router.patch('/:id/favorite', isValidId, validateBody(updateFavoriteById), updateFavorite);

router.delete('/:id', isValidId, remove);

module.exports = router