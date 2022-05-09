import axios from 'axios';
import { getToken } from '../helpers/token';

export const deleteWorkspace = async (workspaceId: string): Promise<void> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${workspaceId}`;

  await axios.delete(ENDPOINT, { headers: { Authorization: getToken() as string } });

  console.log('delete workspace');
};
