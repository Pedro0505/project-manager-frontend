import { IBoardData, ICard } from '../../../interfaces';

export const deleteCard = (payload: ICard, state: IBoardData): IBoardData => {
  const { id, columnId } = payload;
  const { columns, columnsOrder } = { ...state };

  const cardToDeleteIndex = columns[columnId].cards.findIndex((card) => card.id === id);
  columns[payload.columnId].cards.splice(cardToDeleteIndex, 1);

  return { columns, columnsOrder };
};
