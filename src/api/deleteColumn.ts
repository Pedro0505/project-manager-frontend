import axios from 'axios';
import { getToken } from '../helpers/token';

export const deleteColumn = async (id: string) => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/column/${id}`;

  const result = await axios.delete(ENDPOINT, { headers: { Authorization: getToken() as string } });

  console.log('delete column');
  console.log(result.data.data);
};
