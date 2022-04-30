import { IBoardData } from '../../../interfaces';

export const deleteColumn = (payload: string, state: IBoardData): IBoardData => {
  const columnId = payload;
  const { columns, columnsOrder } = { ...state };

  delete columns[columnId];
  const newColumnsOrder = columnsOrder.filter((id) => id !== columnId);

  return { columns, columnsOrder: newColumnsOrder };
};
