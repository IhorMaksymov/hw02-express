const { listContacts } = require('./listContacts');
const { getContactById } = require('./getContactById');
const { addContact } = require('./addContact');
const { updateContact } = require('./updateContact');
const { remove } = require('./remove');
const { updateFavorite } = require('./updateFavorite')

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    remove,
    updateFavorite,
}