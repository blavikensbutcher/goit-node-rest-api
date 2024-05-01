import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {createContactSchema, updateContactSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";
import {isValidId} from "../helpers/isValidId.js";
import {authenticate} from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

// I would add names for each route to understand the logic of each request just by reading the route name

contactsRouter.get("/",authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", authenticate, validateBody(updateContactSchema), isValidId, updateContact);

contactsRouter.delete("/:id",authenticate, isValidId, deleteContact);

// should be "/favorite/:id" to have ID as a last param
contactsRouter.patch("/:id/favorite",authenticate, validateBody(updateFavoriteSchema), isValidId, updateFavorite)

export default contactsRouter;

