import { IColumn } from './Column';

export interface IWorkspace {
  id: number;
  ownerId: number;
  name: string;
}
export interface IWorkspaceId extends IWorkspace {
  columns: IColumn[];
}

export interface IWorkspaceResponse {
  data: IWorkspace[];
}

export interface IWorkspaceIdResponse {
  data: IWorkspaceId;
}

