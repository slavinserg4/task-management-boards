import { ICard } from "../interfaces/card.interface";
import { CardModel } from "../models/card.model";

class CardRepository {
    public create(data: Partial<ICard>) {
        return CardModel.create(data);
    }

    public findById(id: string) {
        return CardModel.findById(id)
            .select("_id title description columnId createdAt updatedAt")
            .lean();
    }

    public update(id: string, data: Partial<ICard>) {
        return CardModel.findByIdAndUpdate(id, data, { new: true })
            .select("_id title description columnId createdAt updatedAt")
            .lean();
    }

    public getByColumnId(columnId: string) {
        return CardModel.find({ columnId })
            .select("_id title description columnId createdAt updatedAt")
            .lean();
    }

    public delete(id: string) {
        return CardModel.findByIdAndDelete(id);
    }
}

export const cardRepository = new CardRepository();
