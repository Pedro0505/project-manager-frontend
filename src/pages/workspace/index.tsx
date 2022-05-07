import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { storeToken } from '../../helpers';
import { IWorkspace } from '../../interfaces';
import * as api from '../../api';
import WorkspaceSelector from '../../components/WorkspaceSelector';

const WORKSPACES_LIMIT = 3;

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

  return (
    <main>
      {session && (
        <button type="button" onClick={handleLogout}>
          Sign out
        </button>
      )}
      <WorkspaceSelector allWorkspaces={workspaces} />
    </main>
  );
}

export default Workspace as NextPage;
