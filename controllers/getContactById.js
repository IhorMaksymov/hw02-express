const Contact = require('../models/contactSchema');
const { ctrlWrapper, HttpError } = require('../helpers');

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contactById = await Contact.findById(id)
    if (!contactById) {
        throw HttpError(404, 'Not found')
    }
    res.status(200).json(contactById)
}

module.exports = {
    getContactById: ctrlWrapper(getContactById),
};