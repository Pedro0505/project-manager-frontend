import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Board from '../../components/Board';
import { getWorkspace } from '../../api';
import { IWorkspace } from '../../interfaces';
import store from '../../redux/store';
import styles from '../../styles/workspace.module.css';

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
    <main className={styles.mainBoardContainer}>
      <Head>
        <title>{workspace || 'Workspace'}</title>
      </Head>
      <div className={styles.navbar}>
        <button type="button" onClick={() => router.push('/workspace')}>
          Back to Menu
        </button>
        <div className={styles.logoRegisterLogin}>
          <p>Mape</p>
        </div>
      </div>
      <Provider store={store}>
        {/* turn into laoding */}
        {router.query.id && <Board workspaceId={router.query.id as string} />}
      </Provider>
    </main>
  );
}

export default WorkspaceId;
