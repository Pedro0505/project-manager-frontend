import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { storeToken } from '../../helpers';
import { IWorkspace } from '../../interfaces';
import * as api from '../../api';
import WorkspaceSelector from '../../components/WorkspaceSelector';
import styles from '../../styles/workspace.module.css';

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching workspaces');
    console.log(session);

    const fetchWorkspaces = async () => {
      const allWorkspaces = await api.getAllWorkspaces();

      setWorkspaces(allWorkspaces);
    };

    fetchWorkspaces();
  }, []);

  const handleLogoutAuth0 = () => {
    storeToken('');
    signOut({ callbackUrl: 'http://localhost:3000' });
  };

  const handleLogoutNoAuth = () => {
    storeToken('');
    router.push('/');
  };

  const deleteWorkspace = async (workspaceId: string) => {
    await api.deleteWorkspace(workspaceId);

    setWorkspaces((prev) => prev.filter(({ id }) => id !== workspaceId));
  };

  const createWorkspace = async (workspaceName: string) => {
    const newWorkspace = await api.createWorkspace(workspaceName);

    setWorkspaces((prev) => [...prev, newWorkspace]);
  };

  const editWorkspace = async (workspaceId: string, newName: string) => {
    await api.editWorkspace(workspaceId, newName);

    setWorkspaces((prev) => {
      const clone = [...prev];
      const indexToEdit = prev.findIndex(({ id }) => id === workspaceId);
      clone[indexToEdit].name = newName;

      return clone;
    });
  };

  return (
    <main className={styles.workspace}>
      <div className={styles.navbar}>
        {session ? (
          <button type="button" onClick={handleLogoutAuth0}>
            Sign out
          </button>
        ) : (
          <button type="button" onClick={handleLogoutNoAuth}>
            Sign out
          </button>
        )}
        <div className={styles.logoRegisterLogin}>
          <p>Mape</p>
        </div>
      </div>
      <WorkspaceSelector
        allWorkspaces={workspaces}
        deleteWorkspace={deleteWorkspace}
        createWorkspace={createWorkspace}
        editWorkspace={editWorkspace}
      />
    </main>
  );
}

export default Workspace as NextPage;
