export interface IWorkspace {
  id: number;
  ownerId: number;
  name: string;
}

export interface IWorkspaceResponse {
  data: IWorkspace[];
}
