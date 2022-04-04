import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import { TiInfoOutline } from 'react-icons/ti';
import { getToken } from '../helpers';
import { ICard } from '../interfaces';
import styles from '../styles/card.module.css';

interface ICardComponent {
  content: string;
  cardId: number;
  index: number;
  setCardList: React.Dispatch<React.SetStateAction<ICard[]>>;
  cardList: ICard[];
  moveCard(fromIndex: number, toIndex: number): void;
}

function Card({ content, cardId, setCardList, cardList, index, moveCard }: ICardComponent) {
  const [confirmDelete, setConfirmDelete] = useState(true);
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { cardId, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<ICardComponent>({
    accept: 'CARD',
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.cardId === cardId) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const deleteCard = async () => {
    if (!confirmDelete) {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card/${cardId}`;

      await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

      const filtered = cardList.filter(({ id }) => cardId !== id);

      setCardList(filtered);
    }

    setConfirmDelete(false);
    setTimeout(() => setConfirmDelete(true), 5000);
  };

  dragRef(dropRef(ref));

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={styles.card}>
      <div className={styles.cardContent}>{content}</div>
      <button className={styles.excludeButton} type="button" onClick={deleteCard}>
        {confirmDelete ? (
          <FaTrash />
        ) : (
          <TiInfoOutline title="Ao clicar você estará excluindo permanentemente esse card" />
        )}
      </button>
    </li>
  );
}

export default Card;
