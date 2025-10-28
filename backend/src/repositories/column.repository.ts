import { IColumn } from "../interfaces/column.interface";
import { Column } from "../models/column.model";

class ColumnRepository {
    public create(data: Partial<IColumn>) {
        return Column.create(data);
    }

    public findById(id: string) {
        return Column.findById(id);
    }

    public findByBoardId(boardId: string) {
        return Column.find({ boardId }).populate("cardIds");
    }

    public update(id: string, data: Partial<IColumn>) {
        return Column.findByIdAndUpdate(id, data, { new: true });
    }

    public delete(id: string) {
        return Column.findByIdAndDelete(id);
    }
}
export const columnRepository = new ColumnRepository();
