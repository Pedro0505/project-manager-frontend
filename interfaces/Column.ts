import { ICard } from './Card';

export interface IColumnUpdateRequest {
  title: string;
}

export interface IColumn {
  id: number;
  title: string;
  workspaceId: number;
  cards: ICard[];
}
