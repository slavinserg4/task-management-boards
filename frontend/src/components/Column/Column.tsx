import { IColumn } from "../../models/IColumnModel";
import { FC, useState } from "react";
import { Card } from "../Card/Card";
import { CreateCard } from "../CreateCard/CreateCard";
import "./styleForColumn.css"

interface IProps {
    column: IColumn;
}

const Column: FC<IProps> = ({column}) => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="column">
            <div className="columnHeader">
                <h3>{column.title}</h3>
                <button
                    className="addCardBtn"
                    onClick={() => setIsCreating(true)}
                >
                    + Add card
                </button>
            </div>
            <div className="cardsContainer">
                {isCreating && (
                    <CreateCard
                        columnId={column._id}
                        onClose={() => setIsCreating(false)}
                    />
                )}
                {column.cardIds.map(card =>
                    <Card key={card._id} card={card} columnId={card.columnId}/>
                )}
            </div>
        </div>
    );
};

export default Column;