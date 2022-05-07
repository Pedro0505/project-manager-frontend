import React from 'react';
import { IWorkspace } from '../../interfaces';
import WorkspaceCard from './components/WorkspaceCard';

interface PropTypes {
  allWorkspaces: IWorkspace[];
}

function WorkspaceSelector({ allWorkspaces }: PropTypes) {
  return (
    <section>
      {allWorkspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspaceData={workspace} />
      ))}
    </section>
  );
}

export default WorkspaceSelector;
