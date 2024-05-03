import jwt from "jsonwebtoken";
import config from "../config/index.js";

const SECRET_KEY = config.SECRET_KEY;

export const createAuthToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
};

export const isJwtValid = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
