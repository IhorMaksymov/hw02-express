const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const { scheme } = require('../../middlewares/validation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(500).json({ message: 'Not found' });
    }
    res.json({ contact });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    const { error } = scheme.validate(req.body);
    

    if (error) {
      return res.status(400).json({message: 'missing required name field'})
    }

    res.json({ newContact });

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDelete = await removeContact(contactId);
    if (!contactDelete) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = scheme.validate(req.body);

    if (!req.body) {
      return res.status(400).json({ message: error.message });
    }

    const upContact = await updateContact(contactId, req.body);

    if (!upContact) {
      return res.status(404).json({ message: error.message });
    }

    res.json({ upContact });
    
  } catch (error) { 
    res.status(500).json({message: error.message})
  }
})

module.exports = router
