/* eslint-disable max-len */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type methods = 'get' | 'post' | 'put' | 'delete';

const handleAxios = async <T = any, R = any>(method: methods, endpoint: string, payload?: R, headers ?: AxiosRequestConfig): Promise<T> => {
  const { data } = await axios[method]<T, AxiosResponse<T>, R>(endpoint, payload, headers);

  return data;
};

export default handleAxios;
