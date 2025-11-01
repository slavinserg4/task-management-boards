import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { cardService } from "../services/card.service";

class CardController {
    public async createCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { columnId, title, description } = req.body;
            const card = await cardService.createCard(
                columnId,
                title,
                description,
            );
            res.status(StatusCodesEnum.CREATED).json(card);
        } catch (error) {
            next(error);
        }
    }

    public async updateCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const card = await cardService.updateCard(id, req.body);
            res.status(StatusCodesEnum.CREATED).json(card);
        } catch (error) {
            next(error);
        }
    }

    public async deleteCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await cardService.deleteCard(id);
            res.status(StatusCodesEnum.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }

    public async moveCard(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                cardId,
                sourceColumnId,
                destinationColumnId,
                destinationIndex,
            } = req.body;
            const result = await cardService.moveCard(
                cardId,
                sourceColumnId,
                destinationColumnId,
                destinationIndex,
            );
            res.status(StatusCodesEnum.OK).json({
                board: result.board,
            });
        } catch (error) {
            next(error);
        }
    }
    public async reorderCards(req: Request, res: Response, next: NextFunction) {
        try {
            const { columnId, sourceIndex, destinationIndex } = req.body;
            const result = await cardService.reorderCardsWithinColumn(
                columnId,
                sourceIndex,
                destinationIndex,
            );
            res.status(StatusCodesEnum.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export const cardController = new CardController();
