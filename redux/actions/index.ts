import { Dispatch } from 'redux';
import * as fetch from '../../helpers/fetch';
import { IBoardData, ICard } from '../../interfaces';
import { IDeleteCard, IDeleteColumn, IEditCard, IInitialFetch } from './interfaces';

export const INITIAL_FETCH = 'INITIAL_FETCH';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_COLUMN = 'DELETE_COLUMN';

const initialFetchAction = (payload: IBoardData): IInitialFetch => ({
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

const deleteColumnAction = (payload: string): IDeleteColumn => ({
  type: DELETE_COLUMN,
  payload,
});

export const initialFetch = (workspaceId: string) => async (dispatch: Dispatch) => {
  const boardData = await fetch.getBoardData(workspaceId);
  dispatch(initialFetchAction(boardData));
};

export const deleteColumn = (columnId: string) => async (dispatch: Dispatch) => {
  const promise = fetch.deleteColumn(columnId);
  dispatch(deleteColumnAction(columnId));

  try {
    await promise;
    console.log('Delete column success');
  } catch (error) {
    console.error('Delete column fail');
  }
};
