import { IBoardData } from '../../interfaces';
import { DELETE_CARD, DELETE_COLUMN, EDIT_CARD, EDIT_COLUMN, INITIAL_FETCH } from '../actions';
import { IAction } from '../actions/interfaces';
import * as utils from './utils';

const initialState: IBoardData = {
  columns: {},
  columnsOrder: [],
};

const reducer = (state: IBoardData = initialState, action: IAction): IBoardData => {
  switch (action.type) {
    case INITIAL_FETCH:
      return action.payload as IBoardData;

    case EDIT_CARD:
      return utils.editCard(action.payload, state);

    case DELETE_CARD:
      return utils.deleteCard(action.payload, state);

    case DELETE_COLUMN:
      return utils.deleteColumn(action.payload, state);

    case EDIT_COLUMN:
      return utils.editColumn(action.payload, state);

    default:
      return state;
  }
};

export default reducer;
