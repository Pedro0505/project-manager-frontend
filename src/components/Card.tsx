import React, { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit, MdWarning } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { toDataTestId } from '../helpers';
import { IBoardData, ICard } from '../interfaces';
import * as actions from '../redux/actions';
import styles from '../styles/card.module.css';

interface PropTypes {
  cardData: ICard;
  cardIndex: number;
}

const maxLength = 190;

function Card({ cardData: { id, content, columnId }, cardIndex }: PropTypes) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(content);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const createInputReference = useRef<HTMLTextAreaElement>(null);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  useEffect(() => {
    createInputReference.current?.focus();
  });

  useEffect(() => {
    document.body.style.pointerEvents = isEditing ? 'none' : 'auto';
  }, [isEditing]);

  useEffect(() => {
    const reference = setTimeout(() => setCanDelete(false), 3000);

    return () => clearTimeout(reference);
  }, [canDelete]);

  const deleteCard = async () => {
    if (canDelete) dispatch(actions.deleteCard({ id, columnId, content }));

    setCanDelete(true);
  };

  const editCard = async () => {
    dispatch(actions.editCard({ id, columnId, content: newContent }));

    setNewContent(content);
    setIsEditing(false);
  };

  const cancelEditCard = () => {
    setNewContent(content);
    setIsEditing(false);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (event.relatedTarget?.id === 'edit-card-confirm-button') return;

    cancelEditCard();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') editCard();
    if (event.key === 'Escape') cancelEditCard();
  };

  return (
    <Draggable draggableId={id} index={cardIndex}>
      {(provided, snapshot) => (
        <li
          className={styles.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className={styles.highlight}>
              <div className={styles.cardTextAreaContainer}>
                <textarea
                  ref={createInputReference}
                  value={newContent}
                  maxLength={190}
                  onChange={({ target }) => setNewContent(target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyboard}
                />
                <span>{maxLength - content.length}</span>
              </div>
              <button id="edit-card-confirm-button" type="button" onClick={editCard}>
                Confirmar
              </button>
            </div>
          ) : (
            <div className={`${styles.card} ${snapshot.isDragging ? styles.cardDragging : ''}`}>
              <button
                type="button"
                data-testid={`delete-card-${toDataTestId(content)}`}
                className={styles.deleteButton}
                onClick={deleteCard}
              >
                {canDelete ? <MdWarning size="1rem" /> : <MdDelete size="1rem" />}
              </button>
              <button
                className={styles.editButton}
                data-testid={`edit-card-${toDataTestId(content)}`}
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <MdEdit />
              </button>
              <div className={styles.cardContent}>{content}</div>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
}

export default Card;
