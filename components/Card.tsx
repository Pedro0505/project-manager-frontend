import axios from 'axios';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { getToken } from '../helpers';
import { ICard } from '../interfaces';

interface ICardComponent {
  content: string;
  cardId: number;
  setCardList: React.Dispatch<React.SetStateAction<ICard[]>>
  cardList: ICard[]
}

function Card({ content, cardId, setCardList, cardList }: ICardComponent) {
  const deleteCard = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card/${cardId}`;

    await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

    const filtered = cardList.filter(({ id }) => cardId !== id);

    setCardList(filtered);
  };

  return (
    <>
      <div>{content}</div>
      <button
        type="button"
        onClick={ deleteCard }
      >
        <FaTrash />
      </button>
    </>
  );
}

export default Card;
