import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Column from '../../components/Column';
import { getToken } from '../../helpers';
import handleAxios from '../../helpers/handleAxios';
import { ICard, IColumn, IWorkspace, IWorkspaceCreate, IWorkspaceIdResponse } from '../../interfaces';
import styles from '../../styles/workspaceId.module.css';

function WorkspaceId() {
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching workspace data');
    console.log(router.query.id);

    const getWorkspaces = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${router.query.id}`;

      try {
        const { data } = await handleAxios<
        IWorkspaceIdResponse,
        AxiosRequestConfig
        >('get', endpoint, { headers: { Authorization: getToken() as string } });

        setWorkspace({ id: data.id, name: data.name, ownerId: data.ownerId });
        setColumns(data.columns);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          router.push('/workspace');
        }
      }
    };

    if (router.query.id) getWorkspaces();
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

      setColumns((prev) => [...prev, created]);
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
          {workspace?.name || ''}
        </title>
      </Head>
      <main>
        {
          !isCreate ? <button onClick={ () => setIsCreate(true) } type="button">Criar Coluna</button> : (
            <>
              <input type="text" onChange={ ({ target }) => setWorkspaceName(target.value) } />
              <button type="button" onMouseDown={ createColumn }>Criar Coluna</button>
              <button type="button" onClick={ () => setIsCreate(false) }>X</button>
            </>
          )
        }
        {workspace?.name}
        <div className={ styles.board }>
          {columns.map(({ title, id, cards }) => (
            <Column key={`${title}-${id}`} cards={cards} id={id} title={title} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default WorkspaceId;
