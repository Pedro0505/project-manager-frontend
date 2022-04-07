import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdOutlineWarningAmber } from 'react-icons/md';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';
import { storeToken } from '../helpers';
import styles from '../styles/login.module.css';
import { ILoginRequest, ILoginResponse, IRegisterUserRequest, IRegisterUserResponse } from '../interfaces';
import errorList from '../helpers/errorList';

interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  uuid?: string;
}

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const [checkUser, setCheckUser] = useState<IUser | boolean>();
  const { user: auth0User } = useUser();
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
        handleError(error.response?.data.error.message);
      }
    }
  };

  useEffect(() => {
    if (auth0User) {
      const emailExist = async (auth0Email: string) => {
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/search?q=${auth0Email}`;
          const { data } = await axios.get<
          IUser,
          AxiosResponse<IUser>
          >(endpoint);

          setCheckUser(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error);
            setCheckUser(false);
          }
        }
      };

      const loginAuth0 = async (userEmail: string) => {
        const loginEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;

        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/search?q=${userEmail}`;
        const { data } = await axios.get<
        IUser,
        AxiosResponse<IUser>
        >(endpoint);

        const user = { email: userEmail, password: data.uuid as string };

        try {
          const response = await axios.post<
            ILoginResponse,
            AxiosResponse<ILoginResponse>,
            ILoginRequest
            >(loginEndpoint, user);

          storeToken(response.data.token);
          router.push('/workspace');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error.response);
          }
        }
      };

      const serializeUser = (userEmail: string, name: string) => {
        const [firstName, lastName] = name.split(' ');
        const randomPassword = uuid();

        return { firstName,
          lastName,
          password: randomPassword,
          email: userEmail,
          uuid: randomPassword };
      };

      const registerAuth0 = async (userEmail: string, name: string) => {
        const newUser = serializeUser(userEmail, name);

        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/register`;

        try {
          await axios.post<
          IRegisterUserResponse,
          AxiosResponse<IRegisterUserResponse>,
            IRegisterUserRequest
          >(endpoint, newUser);

          await loginAuth0(userEmail);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error.response);
          }
        }
      };

      const handleAuth0 = async () => {
        if (auth0User?.email && auth0User?.name) {
          if (!checkUser) await emailExist(auth0User.email);

          if (checkUser) loginAuth0(auth0User.email);
          if (checkUser === false) registerAuth0(auth0User.email, auth0User.name);
        }
      };

      handleAuth0();
    }
  }, [auth0User?.email, router, auth0User, checkUser]);

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
      <div>
        <Link href="/api/auth/login">Git Hub</Link>
      </div>
    </form>
  );
}

export default Login;
