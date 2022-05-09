import axios from 'axios';
import { getToken } from '../helpers/token';
import { IWorkspace } from '../interfaces';

export const createWorkspace = async (workspaceName: string): Promise<IWorkspace> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

  const result = await axios.post(
    ENDPOINT,
    { workspaceName },
    { headers: { Authorization: getToken() as string } },
  );

  console.log('create workspace');
  console.log(result.data.data);

  return result.data.data;
};
