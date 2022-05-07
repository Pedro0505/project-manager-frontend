import axios from 'axios';
import { getToken } from '../helpers/token';

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/column`;

export const moveColumns = async (newColumnsOrder: string[]) => {
  // só vai ser mandado um array de id
  const dataToFetch = newColumnsOrder.map((id) => ({ id }));
  const result = await axios.patch(ENDPOINT, dataToFetch, {
    headers: { Authorization: getToken() as string },
  });

  console.log('move column');
  console.log(result.data.data);
};
