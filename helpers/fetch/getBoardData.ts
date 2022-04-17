import axios from 'axios';
import { IBoardData, IWorkspaceIdResponse } from '../../interfaces';
import { formatWorkspaceData } from '../formatWorkspaceData';
import { getToken } from '../token';

export const getBoardData = async (workspaceId: string): Promise<IBoardData> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${workspaceId}`;

  const result = await axios.get(endpoint, { headers: { Authorization: getToken() as string } });
  const { data } = result.data as IWorkspaceIdResponse;
  const boardData = formatWorkspaceData(data.columns);

  return boardData;
};
