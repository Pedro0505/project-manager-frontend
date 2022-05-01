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

export interface IColumnCreateRequest {
  title: string;
  workspaceId: string;
}

export interface IColumnCreateResponse extends IColumnCreateRequest {
  id: string;
}
