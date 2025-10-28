import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { boardService } from "../services/board.service";

class BoardController {
    public async createBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const board = await boardService.createBoard(name);
            res.json(board).status(StatusCodesEnum.CREATED);
        } catch (error) {
            next(error);
        }
    }

    public async getBoardById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoardById(id);
            res.json(board).status(StatusCodesEnum.OK);
        } catch (error) {
            next(error);
        }
    }

    public async getBoardByHashId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { hashId } = req.params;
            const board = await boardService.getBoardByHashId(hashId);
            res.json(board).status(StatusCodesEnum.OK);
        } catch (error) {
            next(error);
        }
    }

    public async updateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await boardService.updateBoard(id, data);
            res.json(updated).status(StatusCodesEnum.OK);
        } catch (error) {
            next(error);
        }
    }

    public async deleteBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await boardService.deleteBoard(id);
            res.json("Board successfully deleted").status(
                StatusCodesEnum.NO_CONTENT,
            );
        } catch (error) {
            next(error);
        }
    }
}

export const boardController = new BoardController();
