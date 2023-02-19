const { HttpError, ctrlWrapper } = require('../helpers');
const Contact = require('../models/contactSchema');

const remove = async (req, res) => {
    const { id } = req.params;
    const removeContact = await Contact.findByIdAndRemove(id);
    if (!removeContact) {
        throw HttpError(404, 'Not found')
    }
    res.json({ message: 'Contact deleted' });
}

module.exports = {
    remove: ctrlWrapper(remove),
};