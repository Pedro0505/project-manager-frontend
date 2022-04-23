import axios from 'axios';
import { ICard, ICardCreateRequest } from '../../interfaces';
import { getToken } from '../token';

export const createCard = async (cardData: ICardCreateRequest): Promise<ICard> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/card`;

  const result = await axios.post(ENDPOINT, cardData, {
    headers: { Authorization: getToken() as string },
  });

  console.log('create card');
  console.log(result.data.data);

  return result.data.data;
};
