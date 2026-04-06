// server\src\common\middleware\validate.middleware.js
import APIError from "../utils/api.error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const {value, errors} = DtoClass.validate(req.body);
        if (errors) {
            throw APIError.badRequest(errors)
        }
        req.body = value;
        next();
    }
}
export default validate