import { TitlesEnum } from "../enums/titles.enum";
import { ICard } from "./ICardModel";

export interface IColumn {
    _id: string;
    title: TitlesEnum;
    boardId: string;
    cardIds: ICard[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
