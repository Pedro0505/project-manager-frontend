import axios, { AxiosRequestConfig } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../styles/workspace.module.css';
import { getToken } from '../helpers';
import { IWorkspace, IWorkspaceCreate, IWorkspaceCreateResponse, IWorkspaceResponse } from '../interfaces';
import { ITokenData } from '../interfaces/Jwt';
import Workpace from '../components/Workspace';
import handleAxios from '../helpers/handleAxios';

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [limitCreate, setLimitCreate] = useState<number>(0);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Fetching workspaces');

    const getWorkspaces = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

      try {
        const { data } = await handleAxios<IWorkspaceResponse, AxiosRequestConfig>(
          'get',
          endpoint,
          { headers: { Authorization: getToken() as string } },
        );

        setWorkspaces(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          router.push('/');
        }
      }
    };

    getWorkspaces();
  }, [router]);

  useEffect(() => {
    setLimitCreate(workspaces.length);
  }, [workspaces]);

  const createWorkspace = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;
    const token = getToken() as string;
    const decoded = jwtDecode<ITokenData>(token);
    const newWorkspace = { workspaceName, userId: decoded.tokenData.userId };

    try {
      if (!(limitCreate === 3)) {
        const { data } = await handleAxios<IWorkspaceCreate, IWorkspaceCreateResponse>(
          'post',
          endpoint,
          newWorkspace,
          { headers: { Authorization: token } },
        );

        const created = {
          name: data.workspaceName,
          id: data.id,
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
        {
          session && (
            <>
              Signed in as
              {session?.user?.email}
              <br />
              <button type="button" onClick={() => signOut()}>Sign out</button>
            </>

          )
        }
      </div>
    </>
  );
}

export default Workspace as NextPage;
