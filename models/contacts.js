const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsData = path.resolve('./models/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsData, 'utf-8');
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId);
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeContact = await getContactById(contactId);
  const newContactsData = contacts.filter(contact => contact.id !== contactId);
  fs.writeFile(contactsData, JSON.stringify(newContactsData));
  return removeContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const id = uuidv4();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsData, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const upContact = contacts.find(contact => contact.id === contactId);
  if (upContact) {
    upContact.id = contactId;
    upContact.name = name;
    upContact.email = email;
    upContact.phone = phone;
  }
  
  await fs.writeFile(contactsData, JSON.stringify(contacts));

  return upContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
