import Link from 'next/link';
import React from 'react';
import { IWorkspace } from '../../../interfaces';
import styles from '../styles.module.css';

interface PropTypes {
  workspaceData: IWorkspace;
}

function WorkspaceCard({ workspaceData: { id, name } }: PropTypes) {
  return (
    <div>
      <Link href={`/workspace/${id}`}>
        <a className={styles.cardWorkspace}>{name}</a>
      </Link>
    </div>
  );
}

export default WorkspaceCard;
