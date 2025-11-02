import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleForMenu.css";
import { boardActions } from "../../redux/slices/boardSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { boardValidator } from "../../validators/board.validator";

const Menu = () => {
    const [hashId, setHashId] = useState("");
    const [title, setTitle] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

        const { error } = boardValidator.create.validate({ title });
        if (error) {
            setErrorMsg(error.details[0].message);
            return;
        }

        setErrorMsg(null);
        try {
            const result = await dispatch(boardActions.createBoard(title)).unwrap();
            if (result && result.hashId) {
                navigate(`/board/${result.hashId}`);
                setTitle("");
            }
        } catch (err) {
            setErrorMsg("Failed to create board. Please try again.");
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
                {errorMsg && <p className="errorText">{errorMsg}</p>}
                <button type="submit" className="menuButton">
                    Create
                </button>
            </form>
        </div>
    );
};

export default Menu;
