import React, { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IBoardData } from '../../../interfaces';
import * as actions from '../../../redux/actions';
import styles from '../styles.module.css';

interface PropTypes {
  workspaceId: string;
}

function AddColumn({ workspaceId }: PropTypes) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const createInputReference = useRef<HTMLInputElement>(null);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  // faz com que o input seja renderizado com foco
  useEffect(() => {
    createInputReference.current?.focus();
  });

  const handleCreateColumn = () => {
    dispatch(actions.createColumn(title, workspaceId));

    setIsEditing(false);
    setTitle('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget?.id === 'create-column-confirm-button') return;

    handleCancel();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleCreateColumn();
    if (event.key === 'Escape') handleCancel();
  };

  return (
    <div className={styles.addColumnContainer}>
      {isEditing ? (
        <div>
          <input
            ref={createInputReference}
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyboard}
          />
          <div>
            <button type="button" id="create-column-confirm-button" onClick={handleCreateColumn}>
              Confirmar
            </button>
            <button type="button" onClick={handleCancel}>
              <MdOutlineClose />
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.addColumnButton} type="button" onClick={() => setIsEditing(true)}>
          <MdAdd size="18px" />
          <span>Adicionar card</span>
        </button>
      )}
    </div>
  );
}

export default AddColumn;
