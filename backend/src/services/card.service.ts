import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ICard } from "../interfaces/card.interface";
import { boardRepository } from "../repositories/board.repository";
import { cardRepository } from "../repositories/card.repository";
import { columnRepository } from "../repositories/column.repository";
import { columnService } from "./column.service";

class CardService {
    public async createCard(
        columnId: string,
        title: string,
        description: string,
    ): Promise<ICard> {
        const card = await cardRepository.create({
            title,
            description,
            columnId,
        });
        const column = await columnService.findById(columnId);
        column.cardIds.push(card._id);
        await columnService.updateColumn(column._id, column);
        return card;
    }
    public async updateCard(
        id: string,
        data: { title?: string; description?: string },
    ): Promise<ICard> {
        await this.getCardById(id);
        return await cardRepository.update(id, data);
    }
    public async getCardById(id: string): Promise<ICard> {
        const card = await cardRepository.findById(id);
        if (!card) {
            throw new ApiError("Card not found", StatusCodesEnum.NOT_FOUND);
        }
        return card;
    }
    public async deleteCard(id: string) {
        const card = await this.getCardById(id);
        const column = await columnService.findById(card.columnId);
        column.cardIds = column.cardIds.filter((c) => c !== card._id);
        await columnService.updateColumn(column._id, column);
        await cardRepository.delete(id);
    }

    public async moveCard(
        cardId: string,
        sourceColumnId: string,
        destinationColumnId: string,
        destinationIndex: number,
    ) {
        const source = await columnRepository.findByIdWithIds(sourceColumnId);
        const destination = await columnService.findById(destinationColumnId);
        const card = await cardRepository.findById(cardId);

        if (!source || !destination || !card) {
            throw new ApiError(
                "Card or Column not found",
                StatusCodesEnum.NOT_FOUND,
            );
        }

        source.cardIds = source.cardIds.filter(
            (id) => id.toString() !== card._id.toString(),
        );
        await columnService.updateColumn(source._id, source);

        await cardRepository.delete(cardId);

        const updatedCard = await this.createCard(
            destinationColumnId,
            card.title,
            card.description,
        );

        destination.cardIds.splice(destinationIndex, 0, updatedCard._id);
        await columnService.updateColumn(destination._id, destination);

        const board = await boardRepository.getById(source.boardId);

        return {
            board,
        };
    }

    public async reorderCardsWithinColumn(
        columnId: string,
        sourceIndex: number,
        destinationIndex: number,
    ) {
        const column = await columnRepository.findByIdWithIds(columnId);
        if (!column) {
            throw new ApiError("Column not found", StatusCodesEnum.NOT_FOUND);
        }

        const [movedCardId] = column.cardIds.splice(sourceIndex, 1);
        column.cardIds.splice(destinationIndex, 0, movedCardId);

        await columnService.updateColumn(column._id, column);

        return column;
    }
}
export const cardService = new CardService();
