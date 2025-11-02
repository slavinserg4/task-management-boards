import { IBase } from "./base.interface";

export interface ICard extends IBase {
    _id: string;
    title: string;
    description?: string;
    columnId: string;
}
