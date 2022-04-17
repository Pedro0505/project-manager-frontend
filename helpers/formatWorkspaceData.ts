import { IBoardData, IColumn } from '../interfaces';

export const formatWorkspaceData = (columns: IColumn[]): IBoardData => (
  columns.reduce((acc, column) => ({ ...acc, [column.id]: column }), {})
);
