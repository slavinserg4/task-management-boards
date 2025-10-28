import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IColumn } from "../interfaces/column.interface";
import { columnRepository } from "../repositories/column.repository";

class ColumnService {
    public async createColumn(data: Partial<IColumn>): Promise<IColumn> {
        return await columnRepository.create(data);
    }
    public async findById(id: string): Promise<IColumn> {
        const column = await columnRepository.findById(id);
        if (!column) {
            throw new ApiError("Column not found", StatusCodesEnum.BAD_REQUEST);
        }
        return column;
    }
    public getColumnsByBoard(boardId: string): Promise<IColumn[]> {
        return columnRepository.findByBoardId(boardId);
    }

    public async updateColumn(
        id: string,
        data: Partial<IColumn>,
    ): Promise<IColumn> {
        await this.findById(id);
        return await columnRepository.update(id, data);
    }
    public deleteColumn(id: string) {
        return columnRepository.delete(id);
    }
}
export const columnService = new ColumnService();
