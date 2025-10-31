import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { boardActions } from "../../redux/slices/boardSlice";
import { Link } from "react-router-dom";
import "./styleForBoards.css";

const Boards = () => {
    const dispatch = useAppDispatch();
    const { allBoards, loading, error } = useAppSelector(state => state.boardPart);

    useEffect(() => {
        dispatch(boardActions.loadAllBoards());
    }, [dispatch]);

    if (loading) return <div className="boardsMessage">Loading...</div>;
    if (error) return <div className="boardsMessage">Error: {error}</div>;
    if (!allBoards.length) return <div className="boardsMessage">No boards found</div>;

    return (
        <div className="boardsContainer">
            {allBoards.map((board) => (
                <Link key={board._id} to={`/board/${board.hashId}`} className="boardCard">
                    <h3 className="boardTitle">{board.title}</h3>
                    <p className="boardHash">ID: {board.hashId}</p>
                </Link>
            ))}
        </div>
    );
};

export default Boards;
