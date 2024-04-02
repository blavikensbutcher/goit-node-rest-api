import { promises as fs } from "fs";
import path from "path";


const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  //Get all data from bd
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  //Get data from db
  const data = await listContacts();

  //Get contact with current id or return null
  return data.filter((item) => item.id === contactId)[0] || null;
}

export async function removeContact(contactId) {
  const data = await listContacts();

  //Return deleted user
  const response = data.filter((item) => item.id === contactId)[0] || null;

  //Found all users except contactId
  const updatedData = data.filter((item) => item.id !== contactId) || null;

  //IF we don't have such users do not touch db
  if (updatedData && updatedData.length > 0) {
    await fs.writeFile(contactsPath, JSON.stringify(updatedData, null, 2));
  }

  return response;
}

export async function addContact(name, email, phone) {
  //Get data from db
  const data = await listContacts();

  //Add new data to merge with original data
  const newUser = {
    id: String(Date.now()),
    name,
    email,
    phone,
  };

  data.push(newUser);

  //Write data to db

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newUser;
}

export async function changeContact(id, name, email, phone) {
  const contacts = await listContacts();
  const contactID = contacts.findIndex((contact) => contact.id === id);

  if (contactID === -1) {
    return null;
  }

  const updatedContact = {
    id,
    name: name || contacts[contactID].name,
    email: email || contacts[contactID].email,
    phone: phone || contacts[contactID].phone,
  };

  contacts[contactID] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}
