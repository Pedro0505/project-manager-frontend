import { DropResult } from 'react-beautiful-dnd';
import { IBoardData } from '../../../interfaces';

export const moveCardsBetweenColumns = (payload: DropResult, state: IBoardData): IBoardData => {
  const { source, destination } = payload;
  const { columns, columnsOrder } = { ...state };

  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination!.droppableId];

  const sourceItems = sourceColumn.cards;
  const destItems = destColumn.cards;

  const [removed] = sourceItems.splice(source.index, 1);
  removed.columnId = destination!.droppableId;
  destItems.splice(destination!.index, 0, removed);

  return { columns, columnsOrder };
};
