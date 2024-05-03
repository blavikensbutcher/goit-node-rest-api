import { isValidObjectId } from "mongoose";
import httpError from "./httpError.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(404, `Not found`));
  }
  next();
};
