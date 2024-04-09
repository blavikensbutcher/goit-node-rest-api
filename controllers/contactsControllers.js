import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  changeContact,
  updateStatusContact,
} from "../services/contactsServices.js";
import httpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { favorite, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (favorite !== undefined) {
      filter.favorite = favorite;
    }

    const options = {
      page: +page,
      limit: +limit
    };

    let contacts = await listContacts(filter, options);
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      throw httpError(404);
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await removeContact(id);

    if (!removedContact) {
      throw httpError(404);
    }

    res.status(200).json(removedContact);
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;

    const newContact = await addContact(name, email, phone, favorite, owner);

    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updatedContact = await changeContact(
      id,
      name,
      email,
      phone,
      favorite,
    );

    if (!updatedContact) {
      throw httpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const updatedContact = await updateStatusContact(id, favorite);

    if (!updatedContact) {
      throw httpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
};
