import React from 'react';
import { ICard } from '../interfaces';
import Card from './Card';

interface IColumnComponent {
  title: string;
  cards: ICard[];
}

function Column({ title, cards }: IColumnComponent) {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {cards.map(({ title, id, content }) => (
          <Card key={`${title}-${id}-${content}`} content={content} />
        ))}
      </div>
    </div>
  );
}

export default Column;
