import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/workspace.module.css'
import { getToken } from '../helpers';
import { IWorkspace, IWorkspaceResponse } from '../interfaces';

function Workspace() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
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
}

export default Workspace as NextPage;
