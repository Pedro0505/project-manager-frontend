import React, { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { moveCardsBetweenColumn, moveCardsSameColumn, moveColumns } from '../helpers/fetch';
import { IBoardData } from '../interfaces';
import Column from './Column';
import style from '../styles/board.module.css';
import * as actions from '../redux/actions';

interface PropTypes {
  workspaceId: string;
}

const onDragEndsssss = async (
  result: DropResult,
  boardData: IBoardData,
  setBoardData: React.Dispatch<React.SetStateAction<IBoardData>>,
) => {
  if (!result.destination) return;
  const { source, destination, draggableId, type } = result;

  switch (type) {
    case 'CARD': {
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = boardData.columns[source.droppableId];
        const destColumn = boardData.columns[destination.droppableId];
        const sourceItems = [...sourceColumn.cards];
        const destItems = [...destColumn.cards];
        const [removed] = sourceItems.splice(source.index, 1);
        removed.columnId = destination.droppableId;
        destItems.splice(destination.index, 0, removed);

        setBoardData({
          ...boardData,
          columns: {
            ...boardData.columns,
            [source.droppableId]: {
              ...sourceColumn,
              cards: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              cards: destItems,
            },
          },
        });

        await moveCardsBetweenColumn(destItems);
      } else {
        const column = boardData.columns[source.droppableId];
        const copiedItems = [...column.cards];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        setBoardData({
          ...boardData,
          columns: {
            ...boardData.columns,
            [source.droppableId]: {
              ...column,
              cards: copiedItems,
            },
          },
        });

        await moveCardsSameColumn(copiedItems);
      }

      break;
    }

    case 'COLUMN': {
      const newColumnOrder = [...boardData.columnsOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoardData((prev) => ({
        ...prev,
        columnsOrder: newColumnOrder,
      }));

      await moveColumns(newColumnOrder);

      break;
    }

    default:
      console.log('onDragEnd error');
      break;
  }
};

function Board({ workspaceId }: PropTypes) {
  const boardData = useSelector<IBoardData, IBoardData>((state) => state);
  const dispatch: ThunkDispatch<IBoardData, any, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(actions.initialFetch(workspaceId));
  }, [workspaceId, dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === 'COLUMN') dispatch(actions.moveColumns(result));

    if (type === 'CARD') {
      if (source.droppableId === destination.droppableId) {
        dispatch(actions.moveCardsSameColumn(result));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div className={style.board} {...provided.droppableProps} ref={provided.innerRef}>
            {boardData.columnsOrder.map((columnId, index) => (
              <Column key={columnId} columnData={boardData.columns[columnId]} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
