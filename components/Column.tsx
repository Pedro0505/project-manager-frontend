import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { ICard } from '../interfaces';
import Card from './Card';

interface IColumnComponent {
  title: string;
  cards: ICard[];
}

function Column({ title, cards }: IColumnComponent) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <button type="button" aria-label="editar nome da coluna">
          <MdModeEditOutline />
        </button>
      </div>
      <div>
        {cards.map(({ title: cardTitle, id, content }) => (
          <Card key={`${cardTitle}-${id}-${content}`} content={content} />
        ))}
      </div>
    </div>
  );
}

export default Column;
