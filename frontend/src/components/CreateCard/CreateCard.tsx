
import { useState } from 'react';
import { boardActions } from "../../redux/slices/boardSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import "./styleForCreateCard.css";

interface CreateCardProps {
    columnId: string;
    onClose: () => void;
}

export const CreateCard = ({ columnId, onClose }: CreateCardProps) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        dispatch(boardActions.createCard({
            columnId,
            title,
            description
        }));
        onClose();
    };

    return (
        <form className="createCardForm" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
                className="formInput"
                autoFocus
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="formTextarea"
            />
            <div className="formButtons">
                <button type="submit" className="submitBtn">Create</button>
                <button type="button" className="cancelBtn" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
};