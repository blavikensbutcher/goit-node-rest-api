import express from "express";
import validateBody from "../helpers/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/usersSchema.js";
import { registerUser, loginUser } from "../controllers/usersControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  registerUser,
);

authRouter.post(
    "/login",
    validateBody(loginSchema),
    loginUser
)

export default authRouter;
