import { addUser, findUserByEmail } from "../services/usersServices.js";
import bcrypt from "bcryptjs";
import e from "express";
import httpError from "../helpers/HttpError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    ////////////Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    console.log(typeof password);

    ////////////Add new user with hash password
    const newUser = await addUser(email, hashedPassword, subscription);

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

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if(user.length === 0) {
      throw httpError(401, "Email or password is wrong");
    }

    const [{ email: userEmail, subscription: userSubscription, password: userPassword }] = user

    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      userPassword,
    );

    if (!isPasswordCorrect) {
      throw httpError(401, "Email or password is wrong");
    }


    res.status(200).json({
      token: "exmaple",
      user: {
        email: userEmail,
        subscription: userSubscription
      }
    });
  } catch (e) {
    next(e);
  }
};
