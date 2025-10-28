import { model, Schema } from "mongoose";

import { TitleEnum } from "../enums/title.enum";
import { IColumn } from "../interfaces/column.interface";

const ColumnSchema = new Schema(
    {
        title: { type: String, enum: Object.values(TitleEnum), required: true },
        boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
        cardIds: [{ type: Schema.Types.ObjectId, ref: "Card" }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true, versionKey: false },
);
export const Column = model<IColumn>("Column", ColumnSchema);
