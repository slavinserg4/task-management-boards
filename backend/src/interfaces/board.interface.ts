import { IBase } from "./base.interface";

export interface IBoard extends IBase {
    _id: string;
    title: string;
    columnIds?: string[];
    hashId: string;
}
export interface IBoardCreate {
    title: string;
    columnIds?: string[];
}
