import { IBoard } from "../interfaces/board.interface";
import { Board } from "../models/board.model";

export class BoardRepository {
    public getAllBoards(): Promise<IBoard[]> {
        return Board.find();
    }
    public create(title: string, hashId: string): Promise<IBoard> {
        return Board.create({ title, hashId });
    }

    public getById(id: string): Promise<IBoard> {
        return Board.findById(id)
            .populate({
                path: "columnIds",
                select: "_id title boardId cardIds order createdAt updatedAt",
                populate: {
                    path: "cardIds",
                    select: "_id title description columnId createdAt updatedAt",
                },
            })
            .select("_id title columnIds hashId createdAt updatedAt")
            .lean();
    }

    public findByHashId(hashId: string): Promise<IBoard> {
        return Board.findOne({ hashId })
            .populate({
                path: "columnIds",
                select: "_id title boardId cardIds order createdAt updatedAt",
                populate: {
                    path: "cardIds",
                    select: "_id title description columnId createdAt updatedAt",
                },
            })
            .select("_id title columnIds hashId createdAt updatedAt")
            .lean();
    }

    public update(id: string, data: Partial<IBoard>): Promise<IBoard> {
        return Board.findByIdAndUpdate(id, data, { new: true })
            .populate({
                path: "columnIds",
                select: "_id title boardId cardIds order createdAt updatedAt",
                populate: {
                    path: "cardIds",
                    select: "_id title description columnId createdAt updatedAt",
                },
            })
            .select("_id title columnIds hashId createdAt updatedAt")
            .lean();
    }

    public delete(id: string) {
        return Board.findByIdAndDelete(id);
    }
}

export const boardRepository = new BoardRepository();
