import { IColumn } from "../../models/IColumnModel";
import { FC, useState } from "react";
import { Card } from "../Card/Card";
import { CreateCard } from "../CreateCard/CreateCard";
import { Droppable, Draggable } from '@hello-pangea/dnd';

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
            <Droppable droppableId={column._id}>
                {(provided) => (
                    <div
                        className="cardsContainer"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {isCreating && (
                            <CreateCard
                                columnId={column._id}
                                onClose={() => setIsCreating(false)}
                            />
                        )}

                        {column.cardIds.map((card, index) => (
                            <Draggable key={card._id} draggableId={card._id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card card={card} columnId={column._id} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    );
};

export default Column;