import { Contact } from "../schemas/contactsSchemas.js";

export async function listContacts(filter, options) {
  //Get all data from bd with filter params
  return Contact.find(filter)
    .skip((options.page - 1) * options.limit) // if options page = 3 and options limit 10  then (3 - 1) * 10 = 20 then we skip first 20
    .limit(options.limit); // limitation of how much values responsed
}

export async function getContactById(filters) {
  //Get one contact from db
  return Contact.findOne( filters);
}

export async function removeContact(filters) {
  //Get one contact from db and delete
  return Contact.findOneAndDelete(filters);
}

export async function addContact(name, email, phone, favorite, owner) {
  //Post new contact to db
  return Contact.create({ name, email, phone, favorite, owner });
}

export async function changeContact(filters, name, email, phone, favorite) {
  //Find contact by id and update field/fields
  return Contact.findOneAndUpdate(
    filters,
    { name, email, phone, favorite },
    { new: true },
  );
}

export async function updateStatusContact(filters, favorite) {
  //Find contact by id and change field favorite
  return Contact.findOneAndUpdate(filters, { favorite }, { new: true });
}
