// server\src\module\tasks\dto\tasks.dto.js
import Joi from 'joi';
import BaseDTO from '../../../common/dto/base.dto.js';

class TaskDto extends BaseDTO {
    static schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(6).required(),
        status: Joi.string()
            .valid('To Do', 'In Progress', 'Done')
            .required(),
        createdBy: Joi.string().required()
    })
}

export default TaskDto;