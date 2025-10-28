import { model, Schema } from "mongoose";

import { IBoard } from "../interfaces/board.interface";

const BoardSchema = new Schema(
    {
        title: { type: String, required: true },
        columnIds: [{ type: Schema.Types.ObjectId, ref: "Column" }],
        hashId: { type: String, unique: true },
    },
    { timestamps: true, versionKey: false },
);

export const Board = model<IBoard>("Board", BoardSchema);
