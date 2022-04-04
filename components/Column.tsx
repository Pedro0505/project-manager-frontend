import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { getToken } from '../helpers';
import {
  ICard,
  ICardCreateRequest,
  ICardCreateResponse,
  IColumnUpdateRequest,
} from '../interfaces';
import Card from './Card';
import CardCreate from './CardCreate';
import styles from '../styles/column.module.css';

interface IColumnComponent {
  id: number;
  title: string;
  cards: ICard[];
}

function Column({ id, title, cards }: IColumnComponent) {
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
    <section className={styles.column}>
      <div className={styles.columnEditContainer}>
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
      <ul className={ styles.cardList }>
        {cardList.map(({ title: cardTitle, id: cardId, content }) => (
          <Card
            key={`${cardTitle}-${cardId}-${content}`}
            content={content}
            cardId={cardId}
            setCardList={setCardList}
            cardList={cardList}
          />
        ))}
      </ul>
      {isCreatingCard ? (
        <CardCreate createCard={createCard} setIsCreatingCard={setIsCreatingCard} />
      ) : (
        <button type="button" onMouseDown={() => setIsCreatingCard(true)}>
          Adicionar card
        </button>
      )}
    </section>
  );
}

export default Column;
