import { useState } from 'react';
import { ICard } from '../../models/ICardModel';
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { boardActions } from "../../redux/slices/boardSlice";
import "./styleForCard.css";
import { cardValidator } from "../../validators/card.validator";

interface CardProps {
    card: ICard;
    columnId: string;
}

export const Card = ({ card, columnId }: CardProps) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            dispatch(boardActions.deleteCard({ cardId: card._id, columnId }));
        }
    };

    const handleUpdate = () => {
        const { error } = cardValidator.update.validate({ title, description });
        if (error) {
            setError(error.details[0].message);
            return;
        }
        setError(null);
        if(!description || description==='') {
            dispatch(boardActions.updateCard({ id: card._id, updateData: { title } }));
            setIsEditing(false);
        }
        dispatch(boardActions.updateCard({ id: card._id, updateData: { title, description } }));
        setIsEditing(false);
    };

    return (
        <div className="card">
            {isEditing ? (
                <div className="cardEditForm">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="cardEditInput"
                        autoFocus
                        placeholder="Enter title..."
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="cardEditTextarea"
                        placeholder="Enter description (optional)"
                    />
                    {error && <p className="errorText">{error}</p>}
                    <div className="cardEditButtons">
                        <button onClick={handleUpdate} className="saveBtn">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancelBtn">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h4 className="cardTitle">{card.title}</h4>
                    <p className="cardDescription">{card.description}</p>
                    <div className="cardFooter">
                        <button className="editBtn" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="deleteBtn" onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};
