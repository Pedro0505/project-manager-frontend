import { DropResult } from 'react-beautiful-dnd';
import { IBoardData } from '../../../interfaces';

export const moveCardsSameColumn = (payload: DropResult, state: IBoardData): IBoardData => {
  const { source, destination } = payload;
  const { columns, columnsOrder } = { ...state };

  const column = columns[source.droppableId];
  const { cards } = column;
  const [removed] = cards.splice(source.index, 1);
  cards.splice(destination!.index, 0, removed);

  return { columns, columnsOrder };
};
