import { IBoardData, IColumn } from '../../../interfaces';

export const createColumn = (payload: IColumn, state: IBoardData): IBoardData => {
  const { id, cards, title, workspaceId } = payload;
  const { columns, columnsOrder } = { ...state };

  columns[id] = { id, cards, title, workspaceId };
  columnsOrder.push(id);

  return { columns, columnsOrder };
};
