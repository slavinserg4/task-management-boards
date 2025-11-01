import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { columnService } from "../services/column.service";

class ColumnController {
    public async getColumnsById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const column = await columnService.findById(id);
            res.status(StatusCodesEnum.CREATED).json(column);
        } catch (error) {
            next(error);
        }
    }
}

export const columnController = new ColumnController();
