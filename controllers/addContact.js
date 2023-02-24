const Contact = require('../models/contactSchema');
const { ctrlWrapper } = require('../helpers');

const addContact = async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
}

module.exports = {
    addContact: ctrlWrapper(addContact),
};