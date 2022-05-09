import axios from 'axios';
import { IWorkspace } from '../interfaces';
import { getToken } from '../helpers/token';

export const getAllWorkspaces = async (): Promise<IWorkspace[]> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/workspace`;

  const result = await axios.get(ENDPOINT, { headers: { Authorization: getToken() as string } });

  console.log('get all workspaces');
  console.log(result.data.data);

  return result.data.data;
};
