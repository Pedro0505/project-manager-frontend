import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { signIn } from 'next-auth/react';
import { storeToken } from '../helpers';
import styles from '../styles/login.module.css';
import { ILoginRequest, ILoginResponse } from '../interfaces';
import errorList from '../helpers/errorList';
import handleAxios from '../helpers/handleAxios';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const router = useRouter();

  const handleError = (error: keyof typeof errorList) => {
    const message = errorList[error];

    setErrorExist(true);

    setErrorMessage(message || error);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = { email, password };
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;

    try {
      const response = await handleAxios<
        ILoginResponse,
        ILoginRequest
      >('post', endpoint, user);

      storeToken(response.token);
      router.push('/workspace');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        handleError(error.response?.data.error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={ styles.formLogin }>
      <label htmlFor="emailLogin">
        Email
        <input
          type="email"
          placeholder="Email"
          id="emailLogin"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </label>
      <label htmlFor="passwordLogin">
        Password
        <input
          type="password"
          placeholder="Password"
          id="passwordLogin"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      { errorExist && (
        <div className={ styles.errorMessage }>
          <MdOutlineWarningAmber className={ styles.warnigPlate } />
          <p>
            { errorMessage }
          </p>
        </div>
      ) }
      <button className={ styles.loginBtn } type="submit">Login</button>
      <button type="button" onClick={() => signIn()}>Sign in</button>
    </form>
  );
}

export default Login;
