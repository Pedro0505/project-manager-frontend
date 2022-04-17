import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getBoardData } from '../helpers/fetch';
import { IBoardData } from '../interfaces';
import Column from './Column';
import style from '../styles/board.module.css';

interface PropTypes {
  workspaceId: string;
}

const onDragEnd = (
  result: DropResult,
  columns: IBoardData,
  setColumns: React.Dispatch<React.SetStateAction<IBoardData>>,
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.cards];
    const destItems = [...destColumn.cards];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        cards: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        cards: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.cards];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        cards: copiedItems,
      },
    });
  }
};

function Board({ workspaceId }: PropTypes) {
  const [columns, setColumns] = useState<IBoardData>({});

  useEffect(() => {
    console.log('Fetching board data');

    const fetchColumns = async () => {
      const fetchedColumns = await getBoardData(workspaceId);
      setColumns(fetchedColumns);
    };

    fetchColumns();
  }, [workspaceId]);

  return (
    <div className={ style.board }>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => (
          <Column key={id} columnData={column} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default Board;
