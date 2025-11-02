import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import "./styleForBoard.css";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { boardActions } from "../../redux/slices/boardSlice";
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from "../Column/Column";
import { boardValidator } from "../../validators/board.validator";

export const Board = () => {
    const { hashId } = useParams<{ hashId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentBoard, loading, error } = useAppSelector(state => state.boardPart);

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => { if (hashId) dispatch(boardActions.loadBoard(hashId)); }, [dispatch, hashId]);
    useEffect(() => { if (currentBoard) setTitle(currentBoard.title); }, [currentBoard]);

    const handleEdit = () => setEditMode(true);

    const handleSave = () => {
        if (!currentBoard) return;
        const { error } = boardValidator.update.validate({ title });
        if (error) {
            setErrorMsg(error.details[0].message);
            return;
        }
        setErrorMsg(null);
        dispatch(boardActions.updateBoard({ id: currentBoard._id, title }));
        setEditMode(false);
    };

    const handleDelete = () => {
        if (!currentBoard) return;
        dispatch(boardActions.deleteBoard(currentBoard._id));
        navigate("/");
    };

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if (destination.droppableId !== source.droppableId) {
            dispatch(boardActions.moveCard({
                cardId: draggableId,
                sourceColumnId: source.droppableId,
                destinationColumnId: destination.droppableId,
                destinationIndex: destination.index
            }));
        } else {
            dispatch(boardActions.reorderCards({
                columnId: source.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index
            }));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="Rejected"><h2>Board not found</h2></div>;
    if (!currentBoard) return null;

    return (
        <div className="board">
            <div className="boardHeader">
                {editMode ? (
                    <div className="editTitleContainer">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="editTitleInput"
                        />
                        {errorMsg && <p className="errorText">{errorMsg}</p>}
                        <button onClick={handleSave} className="saveBtn">Save</button>
                        <button onClick={() => setEditMode(false)} className="cancelBtn">Cancel</button>
                    </div>
                ) : (
                    <>
                        <h1>{currentBoard.title}</h1>
                        <div className="boardActions">
                            <button onClick={handleEdit} className="editBtn">Edit</button>
                            <button onClick={handleDelete} className="deleteBtn">Delete</button>
                        </div>
                    </>
                )}
                <div className="boardHash">
                    <span className="hashLabel">Board ID:</span>
                    <span className="hashValue">{hashId}</span>
                </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="columnsContainer">
                    {currentBoard.columnIds.map(column => (
                        <Column key={column._id} column={column} />
                    ))}
                </div>
            </DragDropContext>

            <div className="boardLinkContainer">
                <Link to="/" className="boardLink">Go to all your boards</Link>
            </div>
        </div>
    );
};
