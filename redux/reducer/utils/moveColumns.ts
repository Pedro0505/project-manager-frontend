import { DropResult } from 'react-beautiful-dnd';
import { IBoardData } from '../../../interfaces';

export const moveColumns = (payload: DropResult, state: IBoardData): IBoardData => {
  const { source, destination, draggableId } = payload;
  const { columns, columnsOrder } = { ...state };

  columnsOrder.splice(source.index, 1);
  columnsOrder.splice(destination!.index, 0, draggableId);

  return { columns, columnsOrder };
};
