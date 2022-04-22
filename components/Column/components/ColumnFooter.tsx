import React, { FocusEvent, useEffect, useRef, useState } from 'react';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import * as fetch from '../../../helpers/fetch';
import { ICard } from '../../../interfaces';

interface PropTypes {
  id: string;
  addCard: (card: ICard) => void;
}

function ColumnFooter({ id, addCard }: PropTypes) {
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const createInputReference = useRef<HTMLTextAreaElement>(null);
  const maxLength = 190;

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

    const newCard = await fetch.createCard({ columnId: id, content: content.trim() });
    addCard(newCard);
  };

  return (
    <div>
      {isCreatingCard ? (
        <>
          <div>
            <textarea
              ref={createInputReference}
              value={content}
              maxLength={190}
              onChange={({ target }) => setContent(target.value)}
              onBlur={handleBlur}
            />
            <span>{maxLength - content.length}</span>
          </div>
          <div>
            <button id="add-card-button" type="button" onClick={createCard}>
              Adicionar card
            </button>
            <button type="button">
              <MdOutlineClose />
            </button>
          </div>
        </>
      ) : (
        <button type="button" onClick={() => setIsCreatingCard(true)}>
          <MdAdd />
          <span>Adicionar card</span>
        </button>
      )}
    </div>
  );
}

export default ColumnFooter;
