import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from '../../interfaces';
import Card from '../Card';
import styles from '../../styles/column.module.css';
import ColumnHeader from './components/ColumnHeader';
import ColumnFooter from './components/ColumnFooter';

interface PropTypes {
  columnData: IColumn;
  index: number;
  removeColumn: (columnId: string) => void;
  addCard: (card: ICard) => void;
}

function Column({ columnData: { id, title, cards }, index, removeColumn, addCard }: PropTypes) {
  return (
    <Draggable draggableId={id} index={index}>
      {(dragProvided) => (
        <section
          className={styles.column}
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <ColumnHeader
            id={id}
            title={title}
            removeColumn={removeColumn}
            dragHandleProps={dragProvided.dragHandleProps}
          />
          <Droppable droppableId={id} type="CARD">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, cardIndex) => (
                  <Card key={card.id} cardData={card} cardIndex={cardIndex} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <ColumnFooter id={id} addCard={addCard} />
        </section>
      )}
    </Draggable>
  );
}

export default Column;
