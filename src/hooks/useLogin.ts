import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { storeToken } from '../helpers';
import { ILoginRequest, ILoginResponse, IRegisterUserRequest, IRegisterUserResponse, IUser } from '../interfaces';
import handleAxios from '../helpers/handleAxios';

const useLogin = () => {
  const { data: session } = useSession();
  const [checkUser, setCheckUser] = useState<IUser | boolean>();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const emailExist = async (auth0Email: string) => {
        try {
          const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/search?q=${auth0Email}`;

          const data = await handleAxios<IUser, AxiosRequestConfig>('get', endpoint);

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
        const data = await handleAxios<IUser, AxiosRequestConfig>('get', endpoint);

        const user = { email: userEmail, password: data.uuid as string };

        try {
          const response = await handleAxios<ILoginResponse, ILoginRequest>('post', loginEndpoint, user);

          storeToken(response.token);
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
          password: randomPassword.slice(1, 15),
          email: userEmail,
          uuid: randomPassword.slice(1, 15) };
      };

      const registerAuth0 = async (userEmail: string, name: string) => {
        const newUser = serializeUser(userEmail, name);

        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/register`;

        try {
          await handleAxios<IRegisterUserResponse, IRegisterUserRequest>('post', endpoint, newUser);

          await loginAuth0(userEmail);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error.response);
          }
        }
      };

      const handleAuth0 = async () => {
        if (session?.user?.email && session?.user?.name) {
          if (!checkUser) await emailExist(session.user.email);

          if (checkUser) loginAuth0(session.user.email);
          if (checkUser === false) registerAuth0(session.user.email, session.user.name);
        }
      };

      handleAuth0();
    }
  }, [session?.user?.email, router, session, checkUser]);
};

export default useLogin;
