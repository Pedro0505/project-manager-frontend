import axios from 'axios';
import { IColumnCreateRequest, IColumnCreateResponse } from '../../interfaces';
import { getToken } from '../token';

export const createColumn = async (
  columnData: IColumnCreateRequest,
): Promise<IColumnCreateResponse> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/column`;
  const { title, workspaceId } = columnData;

  const result = await axios.post(
    ENDPOINT,
    { title, workspaceId },
    {
      headers: { Authorization: getToken() as string },
    },
  );

  console.log('create column');
  console.log(result.data.data);

  return result.data.data;
};
