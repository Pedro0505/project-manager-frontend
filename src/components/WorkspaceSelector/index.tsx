import React from 'react';
import { IWorkspace } from '../../interfaces';
import WorkspaceCard from './components/WorkspaceCard';

interface PropTypes {
  allWorkspaces: IWorkspace[];
  deleteWorkspace: (workspaceId: string) => void;
}

const WORKSPACES_LIMIT = 3;

function WorkspaceSelector({ allWorkspaces, deleteWorkspace }: PropTypes) {
  return (
    <section>
      {allWorkspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspaceData={workspace}
          deleteWorkspace={deleteWorkspace}
        />
      ))}
    </section>
  );
}

export default WorkspaceSelector;
