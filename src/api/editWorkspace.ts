import axios from 'axios';
import { getToken } from '../helpers/token';
import { IWorkspace } from '../interfaces';

export const editWorkspace = async (workspaceId: string, newName: string): Promise<IWorkspace> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${workspaceId}`;

  const result = await axios.patch(
    ENDPOINT,
    { name: newName },
    { headers: { Authorization: getToken() as string } },
  );

  console.log('edit workspace');
  console.log(result.data.data);

  return result.data.data;
};
