import Joi from "joi";

export const cardValidator = {
    create: Joi.object({
        columnId: Joi.string().required().messages({
            "any.required": "Column ID is required",
            "string.empty": "Column ID cannot be empty",
        }),
        title: Joi.string().trim().min(1).max(50).required().messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 1 character",
            "string.max": "Title must not exceed 50 characters",
            "any.required": "Title is required",
        }),
        description: Joi.string().trim().max(500).optional().messages({
            "string.max": "Description must not exceed 500 characters",
        }),
    }),

    update: Joi.object({
        title: Joi.string().trim().min(1).max(50).optional().messages({
            "string.min": "Title must be at least 1 character",
            "string.max": "Title must not exceed 50 characters",
        }),
        description: Joi.string().trim().min(1).max(500).required().messages({
            "string.empty": "Description cannot be empty",
            "string.min": "Description must be at least 1 character",
            "string.max": "Description must not exceed 500 characters",
            "any.required": "Description is required",
        }),
    }),
};
