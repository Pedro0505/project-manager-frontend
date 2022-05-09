import Link from 'next/link';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { MdDelete, MdEdit, MdWarning } from 'react-icons/md';
import { IWorkspace } from '../../../interfaces';
import styles from '../styles.module.css';

interface PropTypes {
  workspaceData: IWorkspace;
  deleteWorkspace: (workspaceId: string) => void;
  editWorkspace: (workspaceId: string, newName: string) => void;
}

function WorkspaceCard({ workspaceData: { id, name }, deleteWorkspace, editWorkspace }: PropTypes) {
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

  const editWorkspaceCard = async () => {
    editWorkspace(id, newName);

    setNewName(newName);
    setIsEditing(false);
  };

  const cancelEditWorkspaceCard = () => {
    setNewName(name);
    setIsEditing(false);
  };

  const handleBlur = () => {
    cancelEditWorkspaceCard();
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') editWorkspaceCard();
    if (event.key === 'Escape') cancelEditWorkspaceCard();
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyboard}
        />
      ) : (
        <>
          <button type="button" className={styles.deleteButton} onClick={deleteWorkspaceCard}>
            {canDelete ? <MdWarning size="1rem" /> : <MdDelete size="1rem" />}
          </button>
          <button className={styles.editButton} type="button" onClick={() => setIsEditing(true)}>
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
