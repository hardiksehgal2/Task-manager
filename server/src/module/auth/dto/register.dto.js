// server\src\module\auth\dto\register.dto.js
import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().min(2).max(50).lowercase().required(),
        password: Joi.string()
            .min(8).max(50).required(),
    }).required()
}
export default RegisterDto