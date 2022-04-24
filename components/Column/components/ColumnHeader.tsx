/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { MdDelete, MdWarning } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as fetch from '../../../helpers/fetch';
import * as actions from '../../../redux/actions';
import styles from '../../../styles/column.module.css';
import { IBoardData } from '../../../interfaces';

type PropTypes = {
  id: string;
  title: string;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
};

function ColumnHeader({ id, title, dragHandleProps }: PropTypes) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [columnTitleBackup, setColumnTitleBackup] = useState<string>(title);
  const [columnTitleEditing, setColumnTitleEditing] = useState<string>(title);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const editInputReference = useRef<HTMLInputElement>(null);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  useEffect(() => {
    editInputReference.current?.focus();
  });

  const editTitle = async () => {
    await fetch.editColumnName(id, columnTitleEditing);

    setColumnTitleBackup(columnTitleEditing);
    setIsEditing(false);
  };

  const cancelEditTitle = () => {
    setColumnTitleEditing(columnTitleBackup);
    setIsEditing(false);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') editTitle();
    if (event.key === 'Escape') cancelEditTitle();
  };

  const deleteColumn = async () => {
    if (canDelete) dispatch(actions.deleteColumn(id));

    setCanDelete(true);
  };

  useEffect(() => {
    const reference = setTimeout(() => setCanDelete(false), 3000);

    return () => clearTimeout(reference);
  }, [canDelete]);

  return (
    <div className={styles.columnHeader} {...dragHandleProps}>
      {isEditing ? (
        <input
          ref={editInputReference}
          type="text"
          className={styles.columnTitleInput}
          value={columnTitleEditing}
          onChange={({ target }) => setColumnTitleEditing(target.value)}
          onBlur={cancelEditTitle}
          onKeyDown={handleKeyboard}
        />
      ) : (
        <h2 className={styles.columnTitle} onClick={() => setIsEditing(true)}>
          {columnTitleEditing}
        </h2>
      )}
      <button type="button" className={styles.columnHeaderButton} onClick={deleteColumn}>
        {canDelete ? <MdWarning size="1rem" /> : <MdDelete size="1rem" />}
      </button>
    </div>
  );
}

export default ColumnHeader;
