import { DropResult } from 'react-beautiful-dnd';
import { Dispatch } from 'redux';
import * as fetch from '../../helpers/fetch';
import { IBoardData, ICard, ICardCreateRequest } from '../../interfaces';
import ActionTypes from './actionTypes';
import { IDeleteCard, IDeleteColumn, IEditCard, IEditColumn, IInitialFetch } from './interfaces';

// action creators

const initialFetchAction = (payload: IBoardData): IInitialFetch => ({
  type: ActionTypes.INITIAL_FETCH,
  payload,
});

const createCardAction = (payload: ICard) => ({
  type: ActionTypes.CREATE_CARD,
  payload,
});

const editCardAction = (payload: ICard): IEditCard => ({
  type: ActionTypes.EDIT_CARD,
  payload,
});

const deleteCardAction = (payload: ICard): IDeleteCard => ({
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

const moveColumnsAction = (payload: DropResult) => ({
  type: ActionTypes.MOVE_COLUMNS,
  payload,
});

const moveCardsSameColumnAction = (payload: DropResult) => ({
  type: ActionTypes.MOVE_CARDS_SAME_COLUMN,
  payload,
});

// action creators com thunk

export const initialFetch = (workspaceId: string) => async (dispatch: Dispatch) => {
  const boardData = await fetch.getBoardData(workspaceId);
  dispatch(initialFetchAction(boardData));
};

export const editCard = (card: ICard) => async (dispatch: Dispatch) => {
  const promise = fetch.editCardContent(card);
  dispatch(editCardAction(card));

  try {
    await promise;
    console.log('Edit card success');
  } catch (error) {
    console.error('Edit card fail', error);
  }
};

export const createCard = (newCard: ICardCreateRequest) => async (dispatch: Dispatch) => {
  const promise = fetch.createCard(newCard);

  try {
    const result = await promise;
    dispatch(createCardAction(result));
    console.log('Create card success');
  } catch (error) {
    console.error('Create card fail', error);
  }
};

export const deleteCard = (card: ICard) => async (dispatch: Dispatch) => {
  const promise = fetch.deleteCard(card);
  dispatch(deleteCardAction(card));

  try {
    await promise;
    console.log('Delete card success');
  } catch (error) {
    console.error('Delete card fail', error);
  }
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

export const moveColumns = (dropResult: DropResult) => (
  async (dispatch: Dispatch, getState: () => IBoardData) => {
    dispatch(moveColumnsAction(dropResult));
    const newColumnsOrder = getState().columnsOrder;

    try {
      await fetch.moveColumns(newColumnsOrder);
      console.log('Move column success');
    } catch (error) {
      console.error('Move column fail', error);
    }
  }
);

export const moveCardsSameColumn = (dropResult: DropResult) => (
  async (dispatch: Dispatch, getState: () => IBoardData) => {
    dispatch(moveCardsSameColumnAction(dropResult));

    const columnId = dropResult.destination!.droppableId;
    const newCardsOrder = getState().columns[columnId].cards;

    try {
      await fetch.moveCardsSameColumn(newCardsOrder);
      console.log('Move column success');
    } catch (error) {
      console.error('Move column fail', error);
    }
  }
);
