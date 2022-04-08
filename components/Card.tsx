import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TiInfoOutline } from 'react-icons/ti';
import { getToken } from '../helpers';
import { ICard } from '../interfaces';
import styles from '../styles/card.module.css';

interface ICardComponent {
  content: string;
  cardId: number;
  setCardList: React.Dispatch<React.SetStateAction<ICard[]>>
}

function Card({ content, cardId, setCardList }: ICardComponent) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(true);
  const [keyInterval, setKeyInterval] = useState<number>(0);

  const deleteCard = async () => {
    if (!confirmDelete) {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card/${cardId}`;

      await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

      setCardList((prev) => {
        const filtered = prev.filter(({ id }) => cardId !== id);

        return filtered;
      });
    }

    setConfirmDelete(false);
    const myKey = setTimeout(() => setConfirmDelete(true), 5000);
    setKeyInterval(myKey as unknown as number);
  };

  useEffect(() => () => {
    clearTimeout(keyInterval);
  }, [keyInterval]);

  return (
    <li className={ styles.card }>
      <div className={ styles.cardContent }>{content}</div>
      <button
        className={ styles.excludeButton }
        type="button"
        onClick={ deleteCard }
      >
        { confirmDelete ? <FaTrash /> : <TiInfoOutline title="Ao clicar você estará excluindo permanentemente esse card" /> }
      </button>
    </li>
  );
}

export default Card;
