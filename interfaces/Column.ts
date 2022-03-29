import { ICard } from "./Card";

export interface IColumn {
  id: number;
  title: string;
  workspaceId: number;
  cards: ICard[];
}
