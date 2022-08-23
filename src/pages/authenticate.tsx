import type { NextPage } from 'next';
import useLogin from '../hooks/useLogin';
import styles from '../styles/login.module.css';

function Authenticate() {
  useLogin();

  return (
    <div>
      <main className={styles.mainContainerRegisterLogin}>
        <h1 className={styles.loadingRegisterLogin}>Loading...</h1>
      </main>
    </div>
  );
}

export default Authenticate as NextPage;
