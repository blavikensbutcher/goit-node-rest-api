import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// Usually we have a config file (config/index.js) where we store all config variables
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const newJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
};

export const isJwtValid = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
