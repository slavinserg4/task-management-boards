import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TitleEnum } from "../enums/title.enum";
import { ApiError } from "../errors/api.error";
import { IBoard } from "../interfaces/board.interface";
import { boardRepository } from "../repositories/board.repository";
import { generateHash } from "../utils/generate-hash";
import { cardService } from "./card.service";
import { columnService } from "./column.service";

class BoardService {
    public async createBoard(title: string): Promise<IBoard> {
        const hashId = generateHash();
        const board = await boardRepository.create(title, hashId);
        const columns = await Promise.all([
            columnService.create({
                title: TitleEnum.TODO,
                boardId: board._id,
            }),
            columnService.create({
                title: TitleEnum.IN_PROGRESS,
                boardId: board._id,
            }),
            columnService.create({
                title: TitleEnum.DONE,
                boardId: board._id,
            }),
        ]);
        board.columnIds = columns.map((c) => c._id.toString());
        const newBoard = await this.updateBoard(board._id, {
            columnIds: board.columnIds,
        });
        return newBoard;
    }
    public async getBoardById(id: string): Promise<IBoard> {
        const board = await boardRepository.getById(id);
        if (!board) {
            throw new ApiError("Board not found", StatusCodesEnum.BAD_REQUEST);
        }

        return board;
    }
    public async getBoardByHashId(hashId: string): Promise<IBoard> {
        const board = await boardRepository.findByHashId(hashId);
        if (!board) {
            throw new ApiError("Board not found", StatusCodesEnum.BAD_REQUEST);
        }
        return board;
    }
    public async updateBoard(
        id: string,
        data: Partial<IBoard>,
    ): Promise<IBoard> {
        await this.getBoardById(id);
        return await boardRepository.update(id, data);
    }

    public async deleteBoard(id: string) {
        const board = await this.getBoardById(id);
        await Promise.all(
            board.columnIds.map(async (columnId) => {
                const column = await columnService.findById(columnId);
                await Promise.all(
                    column.cardIds.map(async (cardId) => {
                        await cardService.deleteCard(cardId);
                    }),
                );
                await columnService.deleteColumn(columnId);
            }),
        );
        await boardRepository.delete(id);
    }
}
export const boardService = new BoardService();
