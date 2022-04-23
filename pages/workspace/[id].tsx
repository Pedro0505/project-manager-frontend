import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Board from '../../components/Board';
import { getToken } from '../../helpers';
import { getWorkspace } from '../../helpers/fetch';
import { ICard, IWorkspace, IWorkspaceCreate } from '../../interfaces';

function WorkspaceId() {
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching workspace data');

    const fetchWorkspace = async () => {
      const fetchedWorkspace = await getWorkspace(router.query.id as string);
      setWorkspace(fetchedWorkspace);
    };

    // turn into loading
    if (router.query.id) fetchWorkspace();
  }, [router]);

  const createColumn = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/column`;
    const token = getToken() as string;
    const workspaceId = router.query.id as unknown as number;
    const newColumn = {
      workspaceId: +workspaceId,
      title: workspaceName,
    };

    try {
      const { data } = await axios.post<IWorkspaceCreate, AxiosResponse<IWorkspaceCreate>>(
        endpoint,
        newColumn,
        { headers: { Authorization: token } },
      );

      const created = {
        id: data.data.id,
        title: workspaceName,
        workspaceId,
        cards: [] as ICard[],
      };

      // setColumns((prev) => [...prev, created]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>
          Workspace
          {' '}
          {workspace?.name || ''}
        </title>
      </Head>
      <main>
        {!isCreate ? (
          <button onClick={() => setIsCreate(true)} type="button">
            Criar Coluna
          </button>
        ) : (
          <>
            <input type="text" onChange={({ target }) => setWorkspaceName(target.value)} />
            <button type="button" onMouseDown={createColumn}>
              Criar Coluna
            </button>
            <button type="button" onClick={() => setIsCreate(false)}>
              X
            </button>
          </>
        )}
        {workspace?.name}
        <div>
          {/* turn into laoding */}
          {router.query.id && <Board workspaceId={router.query.id as string} />}
        </div>
      </main>
    </div>
  );
}

export default WorkspaceId;
