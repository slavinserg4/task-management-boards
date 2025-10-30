import { IColumn } from "../interfaces/column.interface";
import { Column } from "../models/column.model";

class ColumnRepository {
    public create(data: Partial<IColumn>) {
        return Column.create(data);
    }

    public findById(id: string) {
        return Column.findById(id)
            .populate({
                path: "cardIds",
                select: "_id title description columnId createdAt updatedAt",
            })
            .select("_id title boardId cardIds order createdAt updatedAt")
            .lean();
    }

    public findByBoardId(boardId: string) {
        return Column.find({ boardId })
            .populate({
                path: "cardIds",
                select: "_id title description columnId createdAt updatedAt",
            })
            .select("_id title boardId cardIds order createdAt updatedAt")
            .lean();
    }

    public update(id: string, data: Partial<IColumn>) {
        return Column.findByIdAndUpdate(id, data, { new: true })
            .populate({
                path: "cardIds",
                select: "_id title description columnId createdAt updatedAt",
            })
            .select("_id title boardId cardIds order createdAt updatedAt")
            .lean();
    }

    public delete(id: string) {
        return Column.findByIdAndDelete(id);
    }
}

export const columnRepository = new ColumnRepository();
