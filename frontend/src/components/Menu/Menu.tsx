import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleForMenu.css"
import { boardActions } from "../../redux/slices/boardSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
const Menu = () => {
    const [hashId, setHashId] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (hashId.trim()) {
            navigate(`/board/${hashId.trim()}`);
            setHashId("");
        }
    };
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const result = await dispatch(boardActions.createBoard(title)).unwrap();
        if(result && result.hashId){
            navigate(`/board/${result.hashId}`);
            setTitle("");
        }
    };

    return (
        <div className="menuContainer">
            <h1 className="menuTitle">📝 To Do Board</h1>

            <form onSubmit={handleSubmit} className="menuForm">
                <input
                    type="text"
                    placeholder="Enter board hash ID..."
                    value={hashId}
                    onChange={(e) => setHashId(e.target.value)}
                    className="menuInput"
                />
                <button type="submit" className="menuButton">
                    Search
                </button>
            </form>
            <form onSubmit={handleCreate} className="menuForm">
                <input
                    type="text"
                    placeholder="Enter title to create board..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="menuInput"
                />
                <button type="submit" className="menuButton">
                    Create
                </button>
            </form>

        </div>
    );
};

export default Menu;
