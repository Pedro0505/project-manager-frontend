import React, { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as actions from '../../../redux/actions';
import { IBoardData } from '../../../interfaces';
import styles from '../styles.module.css';

interface PropTypes {
  id: string;
}

const maxLength = 190;

function ColumnFooter({ id }: PropTypes) {
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const createInputReference = useRef<HTMLTextAreaElement>(null);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  useEffect(() => {
    createInputReference.current?.focus();
  });

  const handleCancel = () => {
    setIsCreatingCard(false);
    setContent('');
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (event.relatedTarget?.id === 'add-card-button') return;

    handleCancel();
  };

  const createCard = async () => {
    setContent('');
    setIsCreatingCard(false);

    dispatch(actions.createCard({ columnId: id, content: content.trim() }));
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') createCard();
    if (event.key === 'Escape') handleCancel();
  };

  return (
    <div className={styles.columnFooter}>
      {isCreatingCard ? (
        <>
          <div className={styles.columnFooterInputContainer}>
            <textarea
              ref={createInputReference}
              value={content}
              maxLength={190}
              onChange={({ target }) => setContent(target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyboard}
            />
            <span>{maxLength - content.length}</span>
          </div>
          <div className={styles.columnFooterInputButtonsContainer}>
            <button id="add-card-button" type="button" onClick={createCard}>
              Confirmar
            </button>
            <button type="button">
              <MdOutlineClose />
            </button>
          </div>
        </>
      ) : (
        <button
          className={styles.columnFooterAddButton}
          type="button"
          onClick={() => setIsCreatingCard(true)}
        >
          <MdAdd size="18px" />
          <span>Adicionar card</span>
        </button>
      )}
    </div>
  );
}

export default ColumnFooter;
