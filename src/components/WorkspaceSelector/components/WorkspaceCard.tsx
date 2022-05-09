import Link from 'next/link';
import React, { FocusEvent, KeyboardEvent, useEffect, useState } from 'react';
import { MdDelete, MdEdit, MdWarning } from 'react-icons/md';
import { toDataTestId } from '../../../helpers';
import { IWorkspace } from '../../../interfaces';
import styles from '../styles.module.css';

interface PropTypes {
  workspaceData: IWorkspace;
  deleteWorkspace: (workspaceId: string) => void;
}

function WorkspaceCard({ workspaceData: { id, name }, deleteWorkspace }: PropTypes) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [canDelete, setCanDelete] = useState<boolean>(false);

  useEffect(() => {
    const reference = setTimeout(() => setCanDelete(false), 3000);

    return () => clearTimeout(reference);
  }, [canDelete]);

  const deleteWorkspaceCard = async () => {
    if (canDelete) deleteWorkspace(id);

    setCanDelete(true);
  };

  // const editWorkspaceCard = async () => {
  //   dispatch(actions.editCard({ id, columnId, content: newContent }));

  //   setNewName(name);
  //   setIsEditing(false);
  // };

  const cancelEditWorkspaceCard = () => {
    setNewName(name);
    setIsEditing(false);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget?.id === 'edit-card-confirm-button') return;

    cancelEditWorkspaceCard();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    // if (event.key === 'Enter') editWorkspaceCard();
    if (event.key === 'Escape') cancelEditWorkspaceCard();
  };

  return (
    <div>
      {isEditing ? (
        <input type="text" onBlur={handleBlur} onKeyDown={handleKeyboard} />
      ) : (
        <>
          <button
            type="button"
            data-testid={`delete-workspace-card-${toDataTestId(newName)}`}
            className={styles.deleteButton}
            onClick={deleteWorkspaceCard}
          >
            {canDelete ? <MdWarning size="1rem" /> : <MdDelete size="1rem" />}
          </button>
          <button
            className={styles.editButton}
            data-testid={`edit-workspace-card-${toDataTestId(newName)}`}
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <MdEdit />
          </button>
          <Link href={`/workspace/${id}`}>
            <a className={styles.workspaceCard}>{name}</a>
          </Link>
        </>
      )}
    </div>
  );
}

export default WorkspaceCard;
