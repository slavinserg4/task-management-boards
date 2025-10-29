import Joi from "joi";

export class BoardValidator {
    static create = Joi.object({
        title: Joi.string().trim().min(1).max(50).required(),
    });

    static update = Joi.object({
        title: Joi.string().trim().min(1).max(50).optional(),
    });
}
