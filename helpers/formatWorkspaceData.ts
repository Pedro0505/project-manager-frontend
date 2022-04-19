import { IBoardData, IColumn } from '../interfaces';

export const formatWorkspaceData = (columns: IColumn[]): IBoardData => {
  const result: IBoardData = { columns: {}, columnsOrder: [] };

  columns.forEach((column) => {
    result.columns[column.id] = column;
    result.columnsOrder.push(column.id);
  });

  return result;
};
