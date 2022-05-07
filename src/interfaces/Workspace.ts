import React from 'react';
import { IColumn } from './Column';

export interface IWorkspace {
  id: string;
  ownerId: string;
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

export interface IWorkspaceCreate {
  data: {
    workspaceName: string;
    id: string;
  };
}

export interface IWorkspaceProp {
  name: string;
  id: string;
  setWorkspaces: React.Dispatch<React.SetStateAction<IWorkspace[]>>;
}

export interface IWorkspaceCreateResponse {
  workspaceName: string;
  userId: string;
}
