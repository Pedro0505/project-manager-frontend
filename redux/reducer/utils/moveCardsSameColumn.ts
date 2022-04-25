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

// const column = boardData.columns[source.droppableId];
// const copiedItems = [...column.cards];
// const [removed] = copiedItems.splice(source.index, 1);
// copiedItems.splice(destination.index, 0, removed);

// setBoardData({
//   ...boardData,
//   columns: {
//     ...boardData.columns,
//     [source.droppableId]: {
//       ...column,
//       cards: copiedItems,
//     },
//   },
// });

// await moveCardsSameColumn(copiedItems);
// }

// break;
