import httpError from "./HttpError.js";
import { isJwtValid } from "./jwt.js";
import { User } from "../schemas/usersSchema.js";

export const authenticate = async (req, res, next) => {
  /////GET Bearer and Token from Headers
  const { authorization = "" } = req.headers; /** @returns: undefined if didn't find and split throws error. Set empty string for default */
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401));
  }

  try {
    /////// Check jwt is valid if not throw error
    const { id } = isJwtValid(token);

    ///////if user don't exist on this moment throw err
    const user = await User.findById(id);

    if (!user?.token || user.token !== token) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch (e) {
    next(httpError(401));
  }
};
