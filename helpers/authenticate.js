import httpError from "./HttpError.js";
import {isJwtValid} from "./jwt.js";
import {User} from "../schemas/usersSchema.js";

export const authenticate = async (req, res, next) => {
    /////GET Bearer and Token from Headers
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization;
    if (bearer !== "Bearer") {
        throw httpError(401)
    }

    try {
        /////// Check jwt is valid if not throw error
        const {id} = isJwtValid(token);

        ///////if user dont exists on this moment throw err

        const user = User.findOne(id)
        if (!user) {
            throw httpError(401)
        }
        next()
    } catch (e) {
        throw httpError(401)
    }

};
