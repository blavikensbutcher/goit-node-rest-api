import { promises as fs } from "fs";
import path from "path";
import { Contact } from "../schemas/contact.js";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  //Get all data from bd
  return Contact.find();
}

export async function getContactById(contactId) {
  //Get data from db
  return Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function addContact(name, email, phone, favorite) {
  return Contact.create({ name, email, phone, favorite });
}

export async function changeContact(contactID, name, email, phone, favorite) {
  return Contact.findByIdAndUpdate(
    id,
    { contactID, name, email, phone, favorite },
    { new: true },
  );
}

export async function updateStatusContact(contactID, favorite) {
  return Contact.findByIdAndUpdate(contactID, { favorite }, { new: true });
}
