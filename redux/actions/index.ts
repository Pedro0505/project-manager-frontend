import { Dispatch } from 'redux';
import * as fetch from '../../helpers/fetch';
import { IBoardData, ICard } from '../../interfaces';
import ActionTypes from './actionTypes';
import { IDeleteCard, IDeleteColumn, IEditCard, IEditColumn, IInitialFetch } from './interfaces';

const initialFetchAction = (payload: IBoardData): IInitialFetch => ({
  type: ActionTypes.INITIAL_FETCH,
  payload,
});

export const editCard = (payload: ICard): IEditCard => ({
  type: ActionTypes.EDIT_CARD,
  payload,
});

export const deleteCard = (payload: ICard): IDeleteCard => ({
  type: ActionTypes.DELETE_CARD,
  payload,
});

const deleteColumnAction = (payload: string): IDeleteColumn => ({
  type: ActionTypes.DELETE_COLUMN,
  payload,
});

const editColumnAction = (payload: { id: string; title: string }): IEditColumn => ({
  type: ActionTypes.EDIT_COLUMN,
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
    console.error('Delete column fail', error);
  }
};

export const editColumn = (columnId: string, newTitle: string) => async (dispatch: Dispatch) => {
  const promise = fetch.editColumnName(columnId, newTitle);
  dispatch(editColumnAction({ id: columnId, title: newTitle }));

  try {
    await promise;
    console.log('Edit column success');
  } catch (error) {
    console.error('Edit column fail', error);
  }
};
