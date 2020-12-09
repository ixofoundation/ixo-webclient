import { RootState } from 'common/redux/types';
import React, { Dispatch } from 'react'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { AgentRole } from 'modules/Account/types'
import { connect } from 'react-redux'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { UserInfo } from 'modules/Account/types'
import * as entityAgentSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.selectors'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Redirect } from 'react-router-dom'
import { updateProjectStatus } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { ProjectStatus } from 'modules/Entities/types'

interface Props {
  entityDid?: string
  error?: any
  userInfo?: UserInfo
  handleCreateEntityAgent?: (email: string, name: string, role: AgentRole) => void
  updateProjectStatus?: (projectDid: string, status: ProjectStatus) => void
  assistantPanelToggle: () => void
}

class  CreateAgent extends React.Component<Props> {
  componentDidMount(): void {
    const { userInfo, assistantPanelToggle, handleCreateEntityAgent} = this.props;
    //updateProjectStatus(entityDid, ProjectStatus.Pending)

    assistantPanelToggle()
    if (userInfo) {
      handleCreateEntityAgent('alain.g1127@outlook.com', userInfo.name, AgentRole.ServiceProvider)
    }
  }

  render(): JSX.Element {
    const { userInfo, entityDid } = this.props;

    if (userInfo === null) {
      const to = `/projects/${entityDid}/overview`
      return <Redirect to={to} />
    }

    return null;
  }
}

const mapStateToProps = (state: RootState): any => ({
  entityDid: entitySelectors.selectEntityDid(state),
  userInfo: accountSelectors.selectUserInfo(state),
  error: entityAgentSelectors.selectFetchError(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (email: string, name:string, role: AgentRole): void =>
    dispatch(createEntityAgent(email, name, role)),
  updateProjectStatus: (projectDid: string, status: ProjectStatus): void =>
    dispatch(updateProjectStatus(projectDid, status))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAgent)