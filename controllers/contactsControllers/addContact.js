const Contact = require('../../models/contactSchema');
const { ctrlWrapper } = require('../../helpers');

const addContact = async (req, res) => {
    const { _id } = req.user;
    const contact = await Contact.create({...req.body, owner: _id});
    res.status(201).json(contact);
}

module.exports = {
    addContact: ctrlWrapper(addContact),
};