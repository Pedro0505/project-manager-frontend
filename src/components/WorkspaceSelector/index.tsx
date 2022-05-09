import React from 'react';
import { IWorkspace } from '../../interfaces';
import AddWorkspaceCard from './components/AddWorkspaceCard';
import WorkspaceCard from './components/WorkspaceCard';
import styles from './styles.module.css';

interface PropTypes {
  allWorkspaces: IWorkspace[];
  deleteWorkspace: (workspaceId: string) => void;
  createWorkspace: (workspaceName: string) => void;
}

const WORKSPACES_LIMIT = 3;

function WorkspaceSelector({ allWorkspaces, deleteWorkspace, createWorkspace }: PropTypes) {
  return (
    <section className={styles.workspaceSelector}>
      {allWorkspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspaceData={workspace}
          deleteWorkspace={deleteWorkspace}
        />
      ))}
      {/* renderiza o botão de adicionar workspaces até ter 3 componentes em tela */}
      {[...Array(WORKSPACES_LIMIT - allWorkspaces.length)].map((_el, index) => (
        <AddWorkspaceCard key={`add-workspace-${index}`} createWorkspace={createWorkspace} />
      ))}
    </section>
  );
}

export default WorkspaceSelector;
