// server\src\common\middleware\validate.middleware.js
import APIError from "../utils/api.error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        if (!req.body || typeof req.body !== 'object') {
            return next(APIError.badRequest(['Request body is missing or not JSON. Set Content-Type: application/json']));
        }
        const {value, errors} = DtoClass.validate(req.body);
        if (errors) {
            return next(APIError.badRequest(errors));
        }
        req.body = value;
        next();
    }
}
export default validate