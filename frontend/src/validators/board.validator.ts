import Joi from "joi";

export const boardValidator = {
    create: Joi.object({
        title: Joi.string()
            .trim()
            .min(1)
            .max(50)
            .required()
            .messages({
                "string.empty": "Board title is required",
                "string.min": "Board title must be at least 1 character",
                "string.max": "Board title must not exceed 50 characters",
                "any.required": "Board title is required",
            }),
    }),

    update: Joi.object({
        title: Joi.string()
            .trim()
            .min(1)
            .max(50)
            .optional()
            .messages({
                "string.min": "Board title must be at least 1 character",
                "string.max": "Board title must not exceed 50 characters",
            }),
    }),
};
