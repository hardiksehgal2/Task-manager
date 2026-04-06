// server\src\module\auth\auth.middleware.js
import ApiError from "../../common/utils/api.error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from './auth.model.js'

const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) throw ApiError.unauthorized("No token provided");

        let decode;
        try {
            decode = verifyAccessToken(token);
        } catch (err) {
            if (err.name === "TokenExpiredError") throw ApiError.unauthorized("Token has expired, please login again");
            throw ApiError.unauthorized("Invalid token");
        }

        const user = await User.findById(decode.id);
        if (!user) throw ApiError.unauthorized("User no longer exists");

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        next();
    } catch (err) {
        next(err);
    }
};
export {authenticate};
