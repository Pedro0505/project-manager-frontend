import React from 'react';

interface ICardComponent {
  content: string;
}

function Card({ content }: ICardComponent) {
  return <div>{content}</div>;
}

export default Card;
