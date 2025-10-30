import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(
                        `${key}: ${id} invalid Id`,
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.body || Object.keys(req.body).length === 0) {
                    throw new ApiError(
                        "body cannot be empty",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }

                const { error, value } = validator.validate(req.body, {
                    abortEarly: false,
                    allowUnknown: false,
                });

                if (error) {
                    throw new ApiError(
                        error.details
                            .map((detail) => detail.message)
                            .join(", "),
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }

                req.body = value;
                next();
            } catch (e: any) {
                if (e instanceof ApiError) {
                    next(e);
                } else {
                    next(new ApiError(e.message, StatusCodesEnum.BAD_REQUEST));
                }
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
