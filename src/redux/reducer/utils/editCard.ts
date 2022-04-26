import { IBoardData, ICard } from '../../../interfaces';

export const editCard = (payload: ICard, state: IBoardData): IBoardData => {
  const { id, columnId } = payload;
  const { columns, columnsOrder } = { ...state };

  const cardToEditIndex = columns[columnId].cards.findIndex((card) => card.id === id);
  columns[columnId].cards[cardToEditIndex] = payload;

  return { columns, columnsOrder };
};
