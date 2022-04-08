import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getToken } from '../helpers';
import styles from '../styles/workspace.module.css';
import { IWorkspaceProp } from '../interfaces';

function Workpace({ name, id, setWorkspaces }: IWorkspaceProp) {
  const excludeWorkspace = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${id}`;

    await axios.delete(endpoint, { headers: { Authorization: getToken() as string } });

    setWorkspaces((prev) => {
      const filtered = prev.filter(({ id: workspaceId }) => workspaceId !== id);

      return filtered;
    });
  };

  return (
    <div>
      <Link href={`/workspace/${id}`} key={`${name}-${id}`}>
        <a className={ styles.cardWorkspace }>
          <p>{name}</p>
        </a>
      </Link>
      <button type="button" onClick={ excludeWorkspace }>Excluir</button>
    </div>
  );
}

export default Workpace;
