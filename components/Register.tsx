import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { storeToken } from '../helpers';
import { IRegisterUserRequest, IRegisterUserResponse } from '../interfaces';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = { firstName, lastName, email, password };
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/register`;

    try {
      const response = await axios.post<
        IRegisterUserResponse,
        AxiosResponse<IRegisterUserResponse>,
        IRegisterUserRequest
      >(endpoint, newUser);

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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
