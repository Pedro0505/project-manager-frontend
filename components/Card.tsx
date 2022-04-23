import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../interfaces';
import styles from '../styles/card.module.css';

interface PropTypes {
  cardData: ICard;
  cardIndex: number;
}

function Card({ cardData: { id, content }, cardIndex }: PropTypes) {
  // const [confirmDelete, setConfirmDelete] = useState<boolean>(true);
  // const [keyInterval, setKeyInterval] = useState<number>(0);

  // const deleteCard = async () => {
  //   if (!confirmDelete) {
  //     const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/card/${id}`;

  //     await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

  //     setCardList((prev) => {
  //       const filtered = prev.filter(({ id }) => cardId !== id);

  //       return filtered;
  //     });
  //   }

  //   setConfirmDelete(false);
  //   const myKey = setTimeout(() => setConfirmDelete(true), 5000);
  //   setKeyInterval(myKey as unknown as number);
  // };

  // useEffect(() => () => {
  //   clearTimeout(keyInterval);
  // }, [keyInterval]);

  return (
    <Draggable draggableId={id} index={cardIndex}>
      {(provided, snapshot) => (
        <li
          className={`${styles.card} ${snapshot.isDragging ? styles.cardDragging : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.cardContent}>{content}</div>
        </li>
      )}
    </Draggable>
  );
}

export default Card;
