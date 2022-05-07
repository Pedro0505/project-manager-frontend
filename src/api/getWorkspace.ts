import axios from 'axios';
import { IWorkspace, IWorkspaceIdResponse } from '../interfaces';
import { getToken } from '../helpers/token';

export const getWorkspace = async (workspaceId: string): Promise<IWorkspace> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${workspaceId}`;

  const result = await axios.get(endpoint, { headers: { Authorization: getToken() as string } });
  const { data } = result.data as IWorkspaceIdResponse;
  const workspaceData = { id: data.id, ownerId: data.ownerId, name: data.name };

  return workspaceData;
};
