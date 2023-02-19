const { HttpError, ctrlWrapper } = require('../helpers');
const Contact = require('../models/contactSchema');


const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const upContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!upContact) {
        throw HttpError(404, 'Not found')
    }
    res.status(200).json(upContact)
}

module.exports = {
    updateFavorite: ctrlWrapper(updateFavorite),
};