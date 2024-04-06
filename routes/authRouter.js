import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchema.js";
import { registerUser } from "../controllers/usersControllers.js";
import { validateEmail } from "../helpers/validateEmail.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateEmail,
  validateBody(registerSchema),
  registerUser,
);

export default authRouter;
