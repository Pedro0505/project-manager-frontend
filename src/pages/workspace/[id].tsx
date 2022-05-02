import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Board from '../../components/Board';
import { getWorkspace } from '../../helpers/fetch';
import { IWorkspace } from '../../interfaces';
import store from '../../redux/store';

function WorkspaceId() {
  const [workspace, setWorkspace] = useState<IWorkspace>();
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

  return (
    <>
      <Head>
        <title>{workspace || 'Workspace'}</title>
      </Head>
      <main>
        <Provider store={store}>
          {/* turn into laoding */}
          {router.query.id && <Board workspaceId={router.query.id as string} />}
        </Provider>
      </main>
    </>
  );
}

export default WorkspaceId;
