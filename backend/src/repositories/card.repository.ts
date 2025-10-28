import { ICard } from "../interfaces/card.interface";
import { CardModel } from "../models/card.model";

class CardRepository {
    public create(data: Partial<ICard>) {
        return CardModel.create(data);
    }

    public findById(id: string) {
        return CardModel.findById(id);
    }

    public update(id: string, data: Partial<ICard>) {
        return CardModel.findByIdAndUpdate(id, data, { new: true });
    }
    public getByColumnId(columnId: string) {
        return CardModel.findOne({ columnId });
    }
    public delete(id: string) {
        return CardModel.findByIdAndDelete(id);
    }
}
export const cardRepository = new CardRepository();
