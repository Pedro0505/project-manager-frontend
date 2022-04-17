import { ICard } from './Card';

export interface IColumnUpdateRequest {
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  workspaceId: string;
  cards: ICard[];
}

export interface IColumnCreate {
  data: {
    id: string;
    title: string;
  }
}
