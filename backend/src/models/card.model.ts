import { model, Schema } from "mongoose";

import { ICard } from "../interfaces/card.interface";

const CardSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        columnId: {
            type: Schema.Types.ObjectId,
            ref: "Column",
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);
export const CardModel = model<ICard>("Card", CardSchema);
