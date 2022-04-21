import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getToken } from '../../helpers';
import { ICard, ICardCreateRequest, ICardCreateResponse, IColumn } from '../../interfaces';
import Card from '../Card';
import CardCreate from '../CardCreate';
import styles from '../../styles/column.module.css';
import ColumnHeader from './components/ColumnHeader';

interface PropTypes {
  columnData: IColumn;
  index: number;
}

function Column({ columnData: { id, title, cards }, index }: PropTypes) {
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);
  const [cardList, setCardList] = useState<ICard[]>(cards);

  const createCard = async (cardContent: string) => {
    if (cardContent === '') return;
    setIsCreatingCard(false);
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card`;
    const newCard: ICardCreateRequest = { columnId: id, content: cardContent };

    try {
      const { data } = await axios.post<
        ICardCreateResponse,
        AxiosResponse<ICardCreateResponse>,
        ICardCreateRequest
      >(endpoint, newCard, { headers: { Authorization: getToken() as string } });

      setCardList((prev) => [...prev, data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(dragProvided) => (
        <section
          className={styles.column}
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <ColumnHeader id={id} title={title} dragHandleProps={dragProvided.dragHandleProps} />
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
          {isCreatingCard ? (
            <CardCreate createCard={createCard} setIsCreatingCard={setIsCreatingCard} />
          ) : (
            <button type="button" onMouseDown={() => setIsCreatingCard(true)}>
              Adicionar card
            </button>
          )}
        </section>
      )}
    </Draggable>
  );
}

export default Column;
