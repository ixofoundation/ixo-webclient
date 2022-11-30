import { RootState } from 'redux/types'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as accountSelectors from 'redux/account/account.selectors'
import { UserInfo, AgentRole, ToogleAssistantPayload } from 'redux/account/account.types'
import * as entityAgentSelectors from 'redux/selectedEntityAgents/entityAgents.selectors'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Redirect } from 'react-router-dom'
import { updateProjectStatus } from 'redux/selectedEntity/selectedEntity.actions'
import { ProjectStatus } from 'modules/Entities/types'
import { toggleAssistant } from 'redux/account/account.actions'

interface Props {
  role: AgentRole
  entityDid?: string
  error?: any
  userInfo?: UserInfo
  updateProjectStatus?: (projectDid: string, status: ProjectStatus) => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
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
  toggleAssistant: (param: ToogleAssistantPayload): void => dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAgent)
