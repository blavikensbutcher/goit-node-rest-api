import jwt from "jsonwebtoken";

export const newJWT = (payload) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
};

