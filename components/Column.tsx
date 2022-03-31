import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { getToken } from '../helpers';
import { ICard, IColumnUpdateRequest } from '../interfaces';
import Card from './Card';

interface IColumnComponent {
  id: number;
  title: string;
  cards: ICard[];
}

function Column({ id, title, cards }: IColumnComponent) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>(title);

  const editTitle = async () => {
    if (isEditing) {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/column/${id}`;

      await axios.put<null, AxiosResponse<null>, IColumnUpdateRequest>(
        endpoint,
        { title: columnTitle },
        { headers: { Authorization: getToken() as string } },
      );

      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <section>
      <div>
        {isEditing ? (
          <input
            type="text"
            value={columnTitle}
            onChange={({ target }) => setColumnTitle(target.value)}
          />
        ) : (
          <h2>{columnTitle}</h2>
        )}
        <button type="button" aria-label="editar nome da coluna" onClick={editTitle}>
          <MdModeEditOutline />
        </button>
      </div>
      <div>
        {cards.map(({ title: cardTitle, id: cardId, content }) => (
          <Card key={`${cardTitle}-${cardId}-${content}`} content={content} />
        ))}
      </div>
      {/* <button type="button">Adicionar card</button> */}
    </section>
  );
}

export default Column;
