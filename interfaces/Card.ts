export interface ICardCreateRequest {
  content: string;
  title?: string;
  columnId: string;
}

export interface ICard extends ICardCreateRequest {
  id: string;
}

export interface ICardCreateResponse {
  data: ICard;
}
