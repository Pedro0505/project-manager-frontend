import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { storeToken } from '../helpers';
import styles from '../styles/login.module.css';
import { ILoginRequest, ILoginResponse } from '../interfaces';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = { email, password };
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;

    try {
      const response = await axios.post<
        ILoginResponse,
        AxiosResponse<ILoginResponse>,
        ILoginRequest
      >(endpoint, user);

      storeToken(response.data.token);
      router.push('/workspace');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // transfomar os erros em retorno para o usuário
        console.error(error.response);
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
      <button className={ styles.loginBtn } type="submit">Login</button>
    </form>
  );
}

export default Login;
