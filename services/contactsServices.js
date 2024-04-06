import { Contact } from "../schemas/contact.js";

export async function listContacts() {
  //Get all data from bd
  return Contact.find();
}

export async function getContactById(contactId) {
  //Get one contact from db
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  //Get one contact from db and delete
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(name, email, phone, favorite) {
  //Post new contact to db
  return Contact.create({ name, email, phone, favorite });
}

export async function changeContact(contactID, name, email, phone, favorite) {
  //Find contact by id and update field/fields
  return Contact.findByIdAndUpdate(
    contactID,
    { contactID, name, email, phone, favorite },
    { new: true },
  );
}

export async function updateStatusContact(contactID, favorite) {
  //Find contact by id and change field favorite
  return Contact.findByIdAndUpdate(contactID, { favorite }, { new: true });
}