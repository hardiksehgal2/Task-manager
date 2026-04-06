// server\src\module\auth\dto\login.dto.js
import Joi from 'joi';
import BaseDTO from '../../../common/dto/base.dto.js';

class LoginDto extends BaseDTO{
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required()
    }).required()
}

export default LoginDto