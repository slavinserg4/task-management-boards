import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { columnService } from "../services/column.service";

class ColumnController {
    public async createColumn(req: Request, res: Response, next: NextFunction) {
        try {
            const column = await columnService.createColumn(req.body);
            res.json(column).status(StatusCodesEnum.CREATED);
        } catch (error) {
            next(error);
        }
    }

    public async getColumnsByBoard(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { boardId } = req.params;
            const columns = await columnService.getColumnsByBoard(boardId);
            res.json(columns).status(StatusCodesEnum.OK);
        } catch (error) {
            next(error);
        }
    }

    public async updateColumn(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const column = await columnService.updateColumn(id, req.body);
            res.json(column).status(StatusCodesEnum.CREATED);
        } catch (error) {
            next(error);
        }
    }

    public async deleteColumn(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await columnService.deleteColumn(id);
            res.status(StatusCodesEnum.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}

export const columnController = new ColumnController();
