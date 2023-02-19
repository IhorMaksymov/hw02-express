const Contact = require('../models/contactSchema');
const { ctrlWrapper } = require('../helpers');

const listContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts)
};