export interface ICardCreateRequest {
  content: string;
  title?: string;
  columnId: number;
}

export interface ICard extends ICardCreateRequest {
  id: number;
}

export interface ICardCreateResponse {
  data: ICard;
}
