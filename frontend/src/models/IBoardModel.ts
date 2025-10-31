import { IColumn } from "./IColumnModel";

export interface IBoard {
    _id: string;
    title: string;
    hashId: string;
    columnIds: IColumn[];
    createdAt: Date;
    updatedAt: Date;
}
