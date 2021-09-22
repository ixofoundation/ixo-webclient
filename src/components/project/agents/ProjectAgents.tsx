import * as React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  SectionTitle,
  ActionButton,
  Divider,
  Container,
  MobileOnly,
  DesktopOnly,
} from './ProjectAgents.styles'

import AgentCard from './AgentCard'
import AgentDetail from './AgentDetail'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { RootState } from 'common/redux/types'
import {
  getEntityAgents,
  updateAgentStatus,
} from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { AgentRole } from 'modules/Account/types'
import * as entityAgentSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.selectors'
import {
  AgentStatus,
  EntityAgent,
} from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/types'

export interface ParentProps {
  isFetching: boolean
  agents: EntityAgent[]
  match: any
  handleUpdateAgentStatus: (agentDid: string, status: AgentStatus) => void
  handleGetEntityAgents: (entityDid: string, role: string) => void
}

export interface State {
  isModalOpened: boolean
  selectedAgent: EntityAgent
}

class ProjectAgents extends React.Component<ParentProps, State> {
  state: State = {
    isModalOpened: false,
    selectedAgent: null,
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntityAgents,
    } = this.props

    handleGetEntityAgents(entityDid, AgentRole.ServiceProvider)
  }

  render(): JSX.Element {
    const { isModalOpened, selectedAgent } = this.state
    const { isFetching } = this.props

    if (isFetching) {
      return null
    }

    return (
      <Container>
        <div className="row mb-4 d-none d-sm-block">
          <div className="col-sm-12">
            <div className="text-right">
              <Tab to="#">Agents</Tab>
              <Tab to="#">Pending Approval</Tab>
              <Tab to="#">Waiting Response</Tab>
              <Tab to="#">Not Authorized</Tab>
            </div>
          </div>
        </div>
        {this.renderAgentsSection(AgentStatus.Approved, 'Invite All')}
        <Divider />
        {this.renderAgentsSection(AgentStatus.Pending, 'Approve All')}
        <Divider />
        {this.renderAgentsSection(AgentStatus.Invited, 'New Invite')}
        <Divider />
        {this.renderAgentsSection(AgentStatus.Revoked, 'Message All')}
        <ModalWrapper
          isModalOpen={isModalOpened}
          handleToggleModal={(): void => {
            this.setState({ isModalOpened: false })
          }}
        >
          <AgentDetail
            onClose={(): void => {
              this.setState({ isModalOpened: false })
            }}
            agent={selectedAgent}
            handleAuthorize={this.handleAuthorizeAgent}
            handleReject={this.handleRejectAgent}
            handleDeAuthorize={this.handleDeAuthorizeAgent}
          />
        </ModalWrapper>
      </Container>
    )
  }

  renderAgentsSection = (
    agentStatus: string,
    sectionAction: string,
  ): JSX.Element => {
    const { agents } = this.props
    let sectionTitle = 'Agents'
    switch (agentStatus) {
      case AgentStatus.Approved:
        sectionTitle = 'Agents'
        break
      case AgentStatus.Pending:
        sectionTitle = 'Pending approval'
        break
      case AgentStatus.Invited:
        sectionTitle = 'Invitations waiting response'
        break
      case AgentStatus.Revoked:
        sectionTitle = 'Not Authorized'
        break
    }

    const filtered = agents.filter(
      (agent: EntityAgent) => agent.status === agentStatus,
    )

    return (
      <React.Fragment>
        <div className="row mb-sm-3">
          <div className="col-sm-12 d-flex justify-content-between">
            <SectionTitle>{sectionTitle}</SectionTitle>
            <DesktopOnly>
              <ActionButton>{sectionAction}</ActionButton>
            </DesktopOnly>
          </div>
        </div>
        {this.handleRenderAgents(
          agentStatus,
          filtered,
          'No service providers on this project yet',
        )}
        <MobileOnly>
          <ActionButton>{sectionAction}</ActionButton>
        </MobileOnly>
      </React.Fragment>
    )
  }

  handleAgentClick = (agent: EntityAgent): void => {
    this.setState({ isModalOpened: true, selectedAgent: agent })
  }

  handleAuthorizeAgent = (agent: EntityAgent): void => {
    const { agentDid } = agent

    const { handleUpdateAgentStatus } = this.props

    handleUpdateAgentStatus(agentDid, AgentStatus.Approved)
  }

  handleRejectAgent = (agent: EntityAgent): void => {
    const { agentDid } = agent

    const { handleUpdateAgentStatus } = this.props

    handleUpdateAgentStatus(agentDid, AgentStatus.Revoked)
  }

  handleDeAuthorizeAgent = (agent: EntityAgent): void => {
    const { agentDid } = agent
    const { handleUpdateAgentStatus } = this.props

    handleUpdateAgentStatus(agentDid, AgentStatus.Revoked)
  }

  handleRenderAgents = (agentStatus, agents, emptyMsg: string): JSX.Element => {
    if (agents.length) {
      return (
        <div className="row">
          {agents.map(
            (agent: EntityAgent): JSX.Element => (
              <div className="col-sm-3 my-2" key={agent.agentDid}>
                <AgentCard
                  agentStatus={agentStatus}
                  agent={agent}
                  handleClick={(): void => this.handleAgentClick(agent)}
                  handleAuthorize={this.handleAuthorizeAgent}
                  handleReject={this.handleRejectAgent}
                  handleDeAuthorize={this.handleDeAuthorizeAgent}
                />
              </div>
            ),
          )}
        </div>
      )
    }
    return (
      <div className="row">
        <div
          className="col-sm-12 d-flex justify-content-center align-items-center"
          style={{ minHeight: 200 }}
        >
          {emptyMsg}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  isFetching: entityAgentSelectors.selectIsFetching(state),
  fetchError: entityAgentSelectors.selectFetchError(state),
  agents: entityAgentSelectors.selectEntityAgents(state),
})

const mapDispatchToProps = (dispatch: React.Dispatch<any>): any => ({
  handleGetEntityAgents: (entityDid: string, role: AgentRole): void =>
    dispatch(getEntityAgents(entityDid, role)),
  handleUpdateAgentStatus: (agentDid: string, status: AgentStatus): void =>
    dispatch(updateAgentStatus(agentDid, status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAgents)
