import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/workspace.module.css';
import { getToken } from '../helpers';
import { IWorkspace, IWorkspaceCreate, IWorkspaceResponse } from '../interfaces';
import { ITokenData } from '../interfaces/Jwt';
import Workpace from '../components/Workspace';

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [limitCreate, setLimitCreate] = useState<boolean>(false);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching workspaces');

    const getWorkspaces = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

      try {
        const { data } = await axios.get<IWorkspaceResponse, AxiosResponse<IWorkspaceResponse>>(
          endpoint,
          { headers: { Authorization: getToken() as string } },
        );

        setWorkspaces(data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          router.push('/');
        }
      }
    };

    getWorkspaces();
  }, [router]);

  useEffect(() => {
    if (workspaces.length === 3) {
      setLimitCreate(true);
    }
  }, [workspaces]);

  const createWorkspace = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;
    const token = getToken() as string;
    const decoded = jwtDecode<ITokenData>(token);
    const newWorkspace = { workspaceName, userId: decoded.tokenData.userId };

    try {
      if (!limitCreate) {
        const { data } = await axios.post<IWorkspaceCreate, AxiosResponse<IWorkspaceCreate>>(
          endpoint,
          newWorkspace,
          { headers: { Authorization: token } },
        );

        const created = {
          name: data.data.workspaceName,
          id: data.data.id,
          ownerId: decoded.tokenData.userId,
        };

        setWorkspaces((prev) => [...prev, created]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      {
        !isCreate ? <button onClick={ () => setIsCreate(true) } type="button">Criar Workpace</button> : (
          <>
            <input type="text" onChange={ ({ target }) => setWorkspaceName(target.value) } />
            <button onClick={ createWorkspace } type="button">Criar Workpace</button>
          </>
        )
      }
      <div className={ styles.mainContainerWorkspace }>
        <Head>
          <title>Project Manager | Workspace</title>
        </Head>
        <main className={ styles.containerCardWorkspace }>
          {
            workspaces.map(({ name, id }) => (
              <Workpace
                name={ name }
                key={ `${name}-${id}` }
                id={ id }
                setWorkspaces={ setWorkspaces }
              />
            ))
          }
        </main>
      </div>
    </>
  );
}

export default Workspace as NextPage;
