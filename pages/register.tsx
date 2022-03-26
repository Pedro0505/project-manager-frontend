import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const Register: NextPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = { firstName, lastName, email, password };
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/register`;
    
    // post<IRegisterUserResponse, AxiosResponse<IRegisterUserResponse>, IRegisterUserRequest>
    const response = await axios
      .post(endpoint, user)
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e.response));
  };

  return (
    <div>
      <Head>
        <title>Project Manager | Register</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          name="firstName"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          name="lastName"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
        />
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

export default Register;
