const Contact = require('../../models/contactSchema');
const { ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({owner: _id}).populate('owner', '_id email');
  res.status(200).json(contacts);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts)
};