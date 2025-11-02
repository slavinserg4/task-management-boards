import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../models/IBoardModel";
import { boardService, cardService } from "../../services/api.service";

interface BoardState {
    allBoards: IBoard[];
    currentBoard: IBoard | null;
    loading: boolean;
    error: string | null;
}

const initialState: BoardState = {
    allBoards: [],
    currentBoard: null,
    loading: false,
    error: null
};

// Board actions
export const loadAllBoards = createAsyncThunk(
    'boardSlice/loadAllBoards',
    async (_, thunkAPI) => {
        try {
            const board = await boardService.getAllBoards();
            return thunkAPI.fulfillWithValue(board);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const loadBoard = createAsyncThunk(
    'boardSlice/loadBoard',
    async (hashId: string, thunkAPI) => {
        try {
            const board = await boardService.getByHashId(hashId);
            return thunkAPI.fulfillWithValue(board);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createBoard = createAsyncThunk(
    'boardSlice/createBoard',
    async (title: string, thunkAPI) => {
        try {
            const board = await boardService.create(title);
            return thunkAPI.fulfillWithValue(board);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateBoard = createAsyncThunk(
    'boardSlice/updateBoard',
    async ({ id, title }: { id: string; title: string }, thunkAPI) => {
        try {
            const board = await boardService.update(id, title);
            return thunkAPI.fulfillWithValue(board);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const deleteBoard = createAsyncThunk(
    'boardSlice/deleteBoard',
    async (boardId: string, thunkAPI) => {
        try {
            await boardService.delete(boardId);
            return boardId;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

// Card actions
export const createCard = createAsyncThunk(
    'boardSlice/createCard',
    async (cardData: { columnId: string; title: string; description?: string }, thunkAPI) => {
        try {
            const card = await cardService.create(cardData);
            return thunkAPI.fulfillWithValue({ card, columnId: cardData.columnId });
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateCard = createAsyncThunk(
    'boardSlice/updateCard',
    async ({ id, updateData }: {
        id: string;
        updateData: { title?: string; description?: string }
    }, thunkAPI) => {
        try {
            const card = await cardService.update(id, updateData);
            return thunkAPI.fulfillWithValue(card);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteCard = createAsyncThunk(
    'boardSlice/deleteCard',
    async ({ cardId, columnId }: { cardId: string; columnId: string }, thunkAPI) => {
        try {
            await cardService.delete(cardId);
            return thunkAPI.fulfillWithValue({ cardId, columnId });
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const moveCard = createAsyncThunk(
    'boardSlice/moveCard',
    async (moveData: {
        cardId: string;
        sourceColumnId: string;
        destinationColumnId: string;
        destinationIndex: number;
    }, thunkAPI) => {
        try {
            const card = await cardService.move(moveData);
            return thunkAPI.fulfillWithValue( card );
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const reorderCards = createAsyncThunk(
    'boardSlice/reorderCards',
    async (reorderData: {
        columnId: string;
        sourceIndex: number;
        destinationIndex: number;
    }, thunkAPI) => {
        try {
            await cardService.reorder(reorderData);
            return thunkAPI.fulfillWithValue(reorderData);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        clearBoard: (state) => {
            state.currentBoard = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllBoards.fulfilled, (state, action) => {
                state.allBoards = action.payload;
            })
            .addCase(loadBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBoard = action.payload;
            })
            .addCase(loadBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error in loadBoard';
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.currentBoard = action.payload;
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                if (state.currentBoard?._id === action.payload._id) {
                    state.currentBoard = action.payload;
                }
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                const deletedBoardId = action.payload;
                if (state.currentBoard?._id === deletedBoardId) {
                    state.currentBoard = null;
                }
                state.allBoards = state.allBoards.filter(board => board._id !== deletedBoardId);
            })
            .addCase(createCard.fulfilled, (state, action) => {
                if (!state.currentBoard) return;
                const column = state.currentBoard.columnIds.find(
                    (col) => col._id === action.payload.columnId
                );
                if (column) {
                    column.cardIds.push(action.payload.card);
                }
            })

            .addCase(updateCard.fulfilled, (state, action) => {
                if (!state.currentBoard) return;
                const updatedCard = action.payload;
                state.currentBoard.columnIds.forEach((column) => {
                    const cardIndex = column.cardIds
                        .findIndex(card => card._id === updatedCard._id);
                    if (cardIndex !== -1) {
                        column.cardIds[cardIndex] = updatedCard;
                    }
                });
            })

            .addCase(deleteCard.fulfilled, (state, action) => {
                if (!state.currentBoard) return;
                const { cardId, columnId } = action.payload;
                const column = state.currentBoard.columnIds
                    .find((col) => col._id === columnId);
                if (column) {
                    column.cardIds = column.cardIds
                        .filter(card => card._id !== cardId);
                }
            })

            .addCase(moveCard.fulfilled, (state, action) => {
                if (!state.currentBoard) return;
                state.currentBoard = action.payload.board;

            })
            .addCase(reorderCards.fulfilled, (state, action) => {
                if (!state.currentBoard) return;
                const { columnId, sourceIndex, destinationIndex } = action.payload;

                const column = state.currentBoard.columnIds
                    .find((col) => col._id === columnId);

                if (column) {
                    const [movedCard] = column.cardIds.splice(sourceIndex, 1);
                    column.cardIds.splice(destinationIndex, 0, movedCard);
                }
            });

    }
});

export const boardActions = {
    ...boardSlice.actions,
    loadAllBoards,
    loadBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    createCard,
    updateCard,
    deleteCard,
    moveCard,
    reorderCards
};