import axios from 'axios';
import { ICard } from '../interfaces';
import { getToken } from '../helpers/token';

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/card`;

export const moveCardsSameColumn = async (newCardsOrder: ICard[]) => {
  // só vai ser mandado um array de id
  const dataToFetch = newCardsOrder.map(({ id }) => ({ id }));
  const result = await axios.patch(ENDPOINT, dataToFetch, {
    headers: { Authorization: getToken() as string },
  });

  console.log('move same column');
  console.log(result.data.data);
};
