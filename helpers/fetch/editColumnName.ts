import axios from 'axios';
import { getToken } from '../token';

export const editColumnName = async (id: string, newTitle: string) => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/column/${id}`;

  const result = await axios.put(
    ENDPOINT,
    { title: newTitle },
    {
      headers: { Authorization: getToken() as string },
    },
  );

  console.log('edit column name');
  console.log(result.data.data);
};
