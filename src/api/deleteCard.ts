import axios from 'axios';
import { ICard } from '../interfaces';
import { getToken } from '../helpers/token';

export const deleteCard = async (card: ICard): Promise<void> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/card/${card.id}`;

  await axios.delete(ENDPOINT, {
    headers: { Authorization: getToken() as string },
  });

  console.log('delete card');
};
