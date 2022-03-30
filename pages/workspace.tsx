import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/workspace.module.css'
import { useEffect, useState } from 'react';
import { getToken } from '../helpers';
import { IWorkspace, IWorkspaceResponse } from '../interfaces';

const Workspace: NextPage = () => {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);

  useEffect(() => {
    console.log('Fetching workspaces');

    const getWorkspaces = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

      const { data } = await axios.get<IWorkspaceResponse, AxiosResponse<IWorkspaceResponse>>(
        endpoint,
        { headers: { Authorization: getToken() } }
      );

      setWorkspaces(data.data);
    };

    getWorkspaces();
  }, []);

  return (
    <div className={ styles.mainContainerWorkspace }>
      <Head>
        <title>Project Manager | Workspace</title>
      </Head>
      <main className={ styles.containerCardWorkspace }>
        {workspaces.map(({ name, id }) => (
          <Link href={`/workspace/${id}`} key={`${name}-${id}`}>
            <a className={ styles.cardWorkspace }>{name}</a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Workspace;
