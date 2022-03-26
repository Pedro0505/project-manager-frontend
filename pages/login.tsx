import axios, { AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { storeToken } from '../helpers';
import { ILoginRequest, ILoginResponse } from '../interfaces/LoginUser';

const Login: NextPage = () => {
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
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Project Manager | Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
