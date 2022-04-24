import { IBoardData } from '../../interfaces';
import { DELETE_CARD, DELETE_COLUMN, EDIT_CARD, INITIAL_FETCH } from '../actions';
import {
  IAction,
  IDeleteCard,
  IDeleteColumn,
  IEditCard,
  IInitialFetch,
} from '../actions/interfaces';

const initialState: IBoardData = {
  columns: {},
  columnsOrder: [],
};

const reducer = (state: IBoardData = initialState, action: IAction): IBoardData => {
  switch (action.type) {
    case INITIAL_FETCH: {
      const { payload } = action as IInitialFetch;

      return payload;
    }

    case EDIT_CARD: {
      const { payload } = action as IEditCard;
      const cardsClone = [...state.columns[payload.columnId].cards];
      const cardToEditIndex = cardsClone.findIndex(({ id }) => payload.id === id);
      cardsClone[cardToEditIndex] = payload;

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.columnId]: {
            ...state.columns[payload.columnId],
            cards: cardsClone,
          },
        },
      };
    }

    case DELETE_CARD: {
      const { payload } = action as IDeleteCard;
      const { columns, columnsOrder } = { ...state };

      const cardToDeleteIndex = columns[payload.columnId].cards.findIndex(
        ({ id }) => payload.id === id,
      );
      columns[payload.columnId].cards.splice(cardToDeleteIndex, 1);

      return { columns, columnsOrder };
    }

    case DELETE_COLUMN: {
      const { payload } = action as IDeleteColumn;
      const { columns, columnsOrder } = { ...state };

      delete columns[payload];
      const newColumnsOrder = columnsOrder.filter((id) => id !== payload);

      return { columns, columnsOrder: newColumnsOrder };
    }

    default:
      return state;
  }
};

export default reducer;
