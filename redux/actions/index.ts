import { IBoardData, ICard } from '../../interfaces';
import { IDeleteCard, IEditCard, IInitialFetch } from './interfaces';

export const INITIAL_FETCH = 'INITIAL_FETCH';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';

export const initialFetch = (payload: IBoardData): IInitialFetch => ({
  type: INITIAL_FETCH,
  payload,
});

export const editCard = (payload: ICard): IEditCard => ({
  type: EDIT_CARD,
  payload,
});

export const deleteCard = (payload: ICard): IDeleteCard => ({
  type: DELETE_CARD,
  payload,
});
