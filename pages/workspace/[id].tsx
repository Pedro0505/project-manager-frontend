import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../helpers';
import { IColumn, IWorkspace, IWorkspaceIdResponse } from '../../interfaces';

function WorkspaceId() {
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching workspace data');
    console.log(router.query.id);

    const getWorkspaces = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${router.query.id}`;

      const {
        data: { data },
      } = await axios.get<IWorkspaceIdResponse, AxiosResponse<IWorkspaceIdResponse>>(endpoint, {
        headers: { Authorization: getToken() },
      });

      setWorkspace({ id: data.id, name: data.name, ownerId: data.ownerId });
      setColumns(data.columns);
    };

    if (router.query.id) getWorkspaces();
  }, [router.query.id]);

  return (
    <div>
      <Head>
        <title>Workspace {workspace?.name || ''}</title>
      </Head>
      <main>
        {workspace?.name}
        {columns.map(({ title, id, cards }) => (
          <div key={`${title}-${id}`}>
            <span>{title}</span>
            {cards.map(({ title, content, id }) => (
              <div key={`${title}-${id}-${content}`}>
                <span>{title}</span>
                <span>{content}</span>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}

export default WorkspaceId;
