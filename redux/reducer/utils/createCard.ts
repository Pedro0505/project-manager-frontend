import { IBoardData, ICard } from '../../../interfaces';

export const createCard = (payload: ICard, state: IBoardData): IBoardData => {
  const { id, content, columnId } = payload;
  const { columns, columnsOrder } = { ...state };

  columns[columnId].cards.push({ id, columnId, content });

  return { columns, columnsOrder };
};
