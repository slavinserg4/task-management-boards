import axios from "axios";
import { IBoard } from "../models/IBoardModel";
import { ICard } from "../models/ICardModel";
import { IMoveCard } from "../models/IMoveCard";

const axiosInstance = axios.create({
    baseURL: "/api"
});

export const boardService = {
    getAllBoards: async (): Promise<IBoard[]> => {
        const {data} = await axiosInstance.get<IBoard[]>('/board');
        return data;
    },
    getByHashId: async (hashId: string): Promise<IBoard> => {
        const { data } = await axiosInstance.get<IBoard>(`/board/hash/${hashId}`);
        return data;
    },

    create: async (title: string): Promise<IBoard> => {
        const { data } = await axiosInstance.post<IBoard>('/board', { title });
        return data;
    },

    update: async (id: string, title: string): Promise<IBoard> => {
        const { data } = await axiosInstance.put<IBoard>(`/board/${id}`, { title });
        return data;
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/board/${id}`);
    }
};



export const cardService = {
    create: async (cardData: { columnId: string; title: string; description?: string }): Promise<ICard> => {
        const { data } = await axiosInstance.post<ICard>('/card', cardData);
        return data;
    },

    update: async (id: string, updateData: { title?: string; description?: string }): Promise<ICard> => {
        try {
            const { data } = await axiosInstance.put<ICard>(`/card/${id}`, updateData);
            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Помилка оновлення картки');
            }
            throw error;
        }
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/card/${id}`);
    },

    move: async (moveData: {
        cardId: string;
        sourceColumnId: string;
        destinationColumnId: string;
        destinationIndex: number;
    }): Promise<IMoveCard> => {
        const { data } = await axiosInstance.patch<IMoveCard>('/card/move', moveData);
        return data;
    },
    reorder: async (reorderData: {
        columnId: string;
        sourceIndex: number;
        destinationIndex: number;
    }): Promise<void> => {
        await axiosInstance.patch('/card/reorder', reorderData);
    }

};