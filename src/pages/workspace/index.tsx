import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { storeToken } from '../../helpers';
import { IWorkspace } from '../../interfaces';
import * as api from '../../api';
import WorkspaceSelector from '../../components/WorkspaceSelector';

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Fetching workspaces');

    const fetchWorkspaces = async () => {
      const allWorkspaces = await api.getAllWorkspaces();

      setWorkspaces(allWorkspaces);
    };

    fetchWorkspaces();
  }, []);

  const handleLogout = () => {
    storeToken('');
    signOut({ callbackUrl: 'http://localhost:3000' });
  };

  const deleteWorkspace = async (workspaceId: string) => {
    await api.deleteWorkspace(workspaceId);

    setWorkspaces((prev) => prev.filter(({ id }) => id !== workspaceId));
  };

  const createWorkspace = async (workspaceName: string) => {
    const newWorkspace = await api.createWorkspace(workspaceName);

    setWorkspaces((prev) => [...prev, newWorkspace]);
  };

  return (
    <main>
      {session && (
        <button type="button" onClick={handleLogout}>
          Sign out
        </button>
      )}
      <WorkspaceSelector
        allWorkspaces={workspaces}
        deleteWorkspace={deleteWorkspace}
        createWorkspace={createWorkspace}
      />
    </main>
  );
}

export default Workspace as NextPage;
