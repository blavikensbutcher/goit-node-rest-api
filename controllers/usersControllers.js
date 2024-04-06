import { addUser, findUserByEmail } from "../services/usersServices.js";
import bcrypt from "bcryptjs";
import httpError from "../helpers/HttpError.js";
import { newJWT } from "../helpers/jwt.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    ////////////Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

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
    /////// IF USER DONT EXIST THROW ERROR  ///////////

    if (user.length === 0) {
      throw httpError(401, "Email or password is wrong");
    }

    /////// DESTRUCTURIZATION 1 ITEM OF ARRAY WITH FIELDS ////////
    const [
      {
        email: userEmail,
        subscription: userSubscription,
        password: userPassword,
      },
    ] = user;

    /////// COMPARE PASSWORDS HASH /////////////////////
    const isPasswordCorrect = await bcrypt.compareSync(password, userPassword);

    //////// IF PASSWORD INCORRECT THROW ERROR //////////
    if (!isPasswordCorrect) {
      throw httpError(401, "Email or password is wrong");
    }

    ////////MAKE JWT///////

    const token = newJWT({ id: user[0].id });


    res.status(200).json({
      token: token,
      user: {
        email: userEmail,
        subscription: userSubscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
