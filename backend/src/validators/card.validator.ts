import Joi from "joi";

export class CardValidator {
    static create = Joi.object({
        columnId: Joi.string().required(),
        title: Joi.string().trim().min(1).max(50).required(),
        description: Joi.string().trim().max(500).optional(),
    });

    static update = Joi.object({
        title: Joi.string().trim().min(1).max(50).optional(),
        description: Joi.string().trim().max(500).optional(),
    });

    static move = Joi.object({
        cardId: Joi.string().required(),
        sourceColumnId: Joi.string().required(),
        destinationColumnId: Joi.string().required(),
        destinationIndex: Joi.number().min(0).required(),
    });

    static reorder = Joi.object({
        columnId: Joi.string().required(),
        sourceIndex: Joi.number().min(0).required(),
        destinationIndex: Joi.number().min(0).required(),
    });
}
