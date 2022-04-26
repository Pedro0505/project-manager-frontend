import axios from 'axios';
import { ICard } from '../../interfaces';
import { getToken } from '../token';

export const editCardContent = async (editedCard: ICard): Promise<ICard> => {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/card/${editedCard.id}`;

  const result = await axios.patch(
    ENDPOINT,
    { content: editedCard.content },
    {
      headers: { Authorization: getToken() as string },
    },
  );

  console.log('edit card');
  console.log(result.data.data);

  return result.data.data;
};
