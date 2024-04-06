import { addUser } from "../services/usersServices.js";
import httpError from "../helpers/HttpError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const newUser = await addUser(email, password, subscription);

    if (!newUser) {
      throw httpError(409)
    }

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });

  } catch (e) {
    next(e);
  }
};
