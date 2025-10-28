import { IBoard } from "../interfaces/board.interface";
import { Board } from "../models/board.model";

export class BoardRepository {
    public create(name: string, hashId: string): Promise<IBoard> {
        return Board.create({ name, hashId });
    }
    public getById(id: string): Promise<IBoard> {
        return Board.findById(id);
    }
    public findByHashId(hashId: string): Promise<IBoard> {
        return Board.findOne({ hashId });
    }
    public update(id: string, data: Partial<IBoard>): Promise<IBoard> {
        return Board.findByIdAndUpdate(id, data, { new: true });
    }

    public delete(id: string) {
        return Board.findByIdAndDelete(id);
    }
}
export const boardRepository = new BoardRepository();
