// server\src\common\dto\base.dto.js
import Joi from 'joi'

class BaseDTO{
    static schema = Joi.object({});

    static validate(data){
        const {error, value} = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        });

        if(error){
            const errors = error.details.map((d)=> d.message);
            return { errors, value: true};
        }
        return {errors: null, value}

    }
}
export default BaseDTO