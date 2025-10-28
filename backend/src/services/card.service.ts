import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ICard } from "../interfaces/card.interface";
import { cardRepository } from "../repositories/card.repository";
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
        return await cardRepository.delete(id);
    }
    public async getCardsByColumnId(columnId: string) {
        return await cardRepository.getByColumnId(columnId);
    }
    public async moveCard(
        cardId: string,
        sourceColumnId: string,
        destinationColumnId: string,
        destinationIndex: number,
    ) {
        const source = await columnService.findById(sourceColumnId);
        const destination = await columnService.findById(destinationColumnId);

        if (!source || !destination)
            throw new ApiError("Column not found", StatusCodesEnum.NOT_FOUND);

        // видаляємо картку з попередньої колонки
        source.cardIds = source.cardIds.filter(
            (id) => id.toString() !== cardId.toString(),
        );

        // вставляємо у нову колонку на потрібну позицію
        destination.cardIds.splice(destinationIndex, 0, cardId as any);

        // оновлюємо обидві колонки
        await columnService.updateColumn(source._id, {
            cardIds: source.cardIds,
        });
        await columnService.updateColumn(destination._id, {
            cardIds: destination.cardIds,
        });

        // оновлюємо саму картку
        await cardRepository.update(cardId, { columnId: destinationColumnId });

        return destination;
    }
}
export const cardService = new CardService();
