import { IBoardData } from '../../../interfaces';

type IPayload = {
  id: string;
  title: string;
};

export const editColumn = (payload: IPayload, state: IBoardData): IBoardData => {
  const { id, title } = payload;
  const { columns, columnsOrder } = { ...state };

  columns[id].title = title;

  return { columns, columnsOrder };
};
