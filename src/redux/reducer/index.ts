import { IBoardData } from '../../interfaces';
import ActionTypes from '../actions/actionTypes';
import { IAction } from '../actions/interfaces';
import * as utils from './utils';

const initialState: IBoardData = {
  columns: {},
  columnsOrder: [],
};

const reducer = (state: IBoardData = initialState, action: IAction): IBoardData => {
  switch (action.type) {
    case ActionTypes.INITIAL_FETCH:
      return action.payload as IBoardData;

    case ActionTypes.CREATE_CARD:
      return utils.createCard(action.payload, state);

    case ActionTypes.EDIT_CARD:
      return utils.editCard(action.payload, state);

    case ActionTypes.DELETE_CARD:
      return utils.deleteCard(action.payload, state);

    case ActionTypes.CREATE_COLUMN:
      return utils.createColumn(action.payload, state);

    case ActionTypes.DELETE_COLUMN:
      return utils.deleteColumn(action.payload, state);

    case ActionTypes.EDIT_COLUMN:
      return utils.editColumn(action.payload, state);

    case ActionTypes.MOVE_COLUMNS:
      return utils.moveColumns(action.payload, state);

    case ActionTypes.MOVE_CARDS_SAME_COLUMN:
      return utils.moveCardsSameColumn(action.payload, state);

    case ActionTypes.MOVE_CARDS_BETWEEN_COLUMNS:
      return utils.moveCardsBetweenColumns(action.payload, state);

    default:
      return state;
  }
};

export default reducer;
