const fs = require('fs').promises;
const path = require("path");
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => { 
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const addContact = async (name, email, phone) => { 
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};