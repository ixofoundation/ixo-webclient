import { RootState } from 'common/redux/types'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { UserInfo, AgentRole, ToogleAssistantPayload } from 'modules/Account/types'
import * as entityAgentSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.selectors'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Redirect } from 'react-router-dom'
import { updateProjectStatus } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { ProjectStatus } from 'modules/Entities/types'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { toggleAssistant } from 'modules/Account/Account.actions'

interface Props {
  role: AgentRole
  entityDid?: string
  error?: any
  userInfo?: UserInfo
  updateProjectStatus?: (projectDid: string, status: ProjectStatus) => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
  handleCreateEntityAgent?: (email: string, name: string, role: AgentRole) => void
}

class CreateAgent extends React.Component<Props> {
  componentDidMount(): void {
    const { toggleAssistant, role } = this.props
    toggleAssistant!({
      fixed: true,
      intent: '/apply{"action":"authorise","msg_type":"agent_application"}',
      params: {
        role,
      },
    })
  }

  render(): JSX.Element {
    const { userInfo, entityDid } = this.props
    if (userInfo === null) {
      const to = `/projects/${entityDid}/overview`
      return <Redirect to={to} />
    }

    return null!
  }
}

const mapStateToProps = (state: RootState): any => ({
  entityDid: entitySelectors.selectEntityDid(state),
  userInfo: accountSelectors.selectUserInfo(state),
  error: entityAgentSelectors.selectFetchError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  updateProjectStatus: (projectDid: string, status: ProjectStatus): void =>
    dispatch(updateProjectStatus(projectDid, status)),
  handleCreateEntityAgent: (email: string, name: string, role: AgentRole): void =>
    dispatch(createEntityAgent(email, name, role)),
  toggleAssistant: (param: ToogleAssistantPayload): void => dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAgent)
