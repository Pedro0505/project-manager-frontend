import { IColumn } from './Column';

export interface IBoardData {
  columns: {
    [columnId: string]: IColumn;
  };
  columnsOrder: string[];
}
