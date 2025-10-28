import { TitleEnum } from "../enums/title.enum";
import { IBase } from "./base.interface";

export interface IColumn extends IBase {
    _id: string;
    title: TitleEnum;
    boardId: string;
    cardIds: string[];
    order: number;
}
