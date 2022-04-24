import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getBoardData,
  moveCardsBetweenColumn,
  moveCardsSameColumn,
  moveColumns,
} from '../helpers/fetch';
import { IBoardData, ICard } from '../interfaces';
import Column from './Column';
import style from '../styles/board.module.css';
import { initialFetch } from '../redux/actions';

interface PropTypes {
  workspaceId: string;
}

const onDragEnd = async (
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
  const [boardData, setBoardData] = useState<IBoardData>({ columns: {}, columnsOrder: [] });
  const data = useSelector<IBoardData, IBoardData>((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Fetching board data');

    const fetchData = async () => {
      const fetchedData = await getBoardData(workspaceId);
      dispatch(initialFetch(fetchedData));
    };

    fetchData();
  }, [workspaceId, dispatch]);

  const removeColumn = (columnId: string) => {
    const { columns, columnsOrder } = { ...boardData };

    delete columns[columnId];
    const newColumnsOrder = columnsOrder.filter((id) => columnId !== id);
    console.log('updated state', { columns, columnsOrder });

    setBoardData({ columns, columnsOrder: newColumnsOrder });
  };

  const addCard = (card: ICard) => {
    const { columns, columnsOrder } = { ...boardData };
    columns[card.columnId].cards.push(card);

    setBoardData({ columns, columnsOrder });
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, boardData, setBoardData)}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div className={style.board} {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnsOrder.map((columnId, index) => (
              <Column
                key={columnId}
                columnData={data.columns[columnId]}
                index={index}
                removeColumn={removeColumn}
                addCard={addCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
