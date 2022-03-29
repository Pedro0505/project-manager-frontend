import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
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
    <div>
      <Head>
        <title>Project Manager | Workspace</title>
      </Head>
      <main>
        {workspaces.map(({ name, id }) => (
          <div key={`${name}-${id}`}>{name}</div>
        ))}
      </main>
    </div>
  );
};

export default Workspace;
