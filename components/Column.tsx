import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getToken } from '../helpers';
import {
  ICard,
  ICardCreateRequest,
  ICardCreateResponse,
  IColumn,
  IColumnUpdateRequest,
} from '../interfaces';
import Card from './Card';
import CardCreate from './CardCreate';
import styles from '../styles/column.module.css';

interface PropTypes {
  columnData: IColumn;
  index: number;
}

function Column({ columnData: { id, title, cards }, index }: PropTypes) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);
  const [columnTitleBackup, setColumnTitleBackup] = useState<string>(title);
  const [columnTitleEditing, setColumnTitleEditing] = useState<string>(title);
  const [cardList, setCardList] = useState<ICard[]>(cards);

  useEffect(() => {
    setColumnTitleEditing(columnTitleBackup);
  }, [columnTitleBackup]);

  const editTitle = async () => {
    if (isEditing) {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/column/${id}`;

      await axios.put<null, AxiosResponse<null>, IColumnUpdateRequest>(
        endpoint,
        { title: columnTitleEditing },
        { headers: { Authorization: getToken() as string } },
      );

      setColumnTitleBackup(columnTitleEditing);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const cancelEditTitle = () => {
    setColumnTitleEditing(columnTitleBackup);
    setIsEditing(false);
  };

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
          <div className={styles.columnEditContainer} {...dragProvided.dragHandleProps}>
            {isEditing ? (
              <input
                type="text"
                value={columnTitleEditing}
                onChange={({ target }) => setColumnTitleEditing(target.value)}
                onBlur={cancelEditTitle}
              />
            ) : (
              <h2 className={styles.columnTitle}>{columnTitleEditing}</h2>
            )}
            <button
              className={styles.columnEditButton}
              type="button"
              aria-label="editar nome da coluna"
              onMouseDown={editTitle}
            >
              <MdModeEditOutline />
            </button>
          </div>
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
