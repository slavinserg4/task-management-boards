import { useState } from 'react';
import { boardActions } from "../../redux/slices/boardSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { cardValidator } from "../../validators/card.validator";
import "./styleForCreateCard.css";

interface CreateCardProps {
    columnId: string;
    onClose: () => void;
}

export const CreateCard = ({ columnId, onClose }: CreateCardProps) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = cardValidator.create.validate({ title, description, columnId });
        if (error) {
            setError(error.details[0].message);
            return;
        }

        setError(null);
        if(!description || description==='') {
            dispatch(boardActions.createCard({ columnId, title }));
            onClose();
        }
        dispatch(boardActions.createCard({ columnId, title, description }));
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
                placeholder="Description (optional)"
                className="formTextarea"
            />
            {error && <p className="errorText">{error}</p>}
            <div className="formButtons">
                <button type="submit" className="submitBtn">Create</button>
                <button type="button" className="cancelBtn" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
};
