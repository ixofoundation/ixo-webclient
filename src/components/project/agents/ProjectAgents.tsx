import * as React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  SectionTitle,
  ActionButton,
  Divider,
  Container,
  MobileOnly,
  DesktopOnly
} from './ProjectAgents.styles'

import AgentCard from './AgentCard'
import AgentDetail from './AgentDetail'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { RootState } from 'common/redux/types'
import { getEntityAgents } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { AgentRole } from 'modules/Account/types'
import * as entityAgentSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.selectors'

export interface ParentProps {
  agents: any
  match: any
  handleUpdateAgentStatus: (status: object, did: string, role: string) => void
  handleGetEntityAgents: (entityDid: string, role: string) => void
}

export interface State {
  isModalOpened: boolean
}

class ProjectAgents extends React.Component<ParentProps, State> {
  state: State = {
    isModalOpened: false
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntityAgents
    } = this.props;
    handleGetEntityAgents(entityDid, 'IA')
  }

  render(): JSX.Element {
    const { isModalOpened } = this.state;
    return (
      <Container>
        <div className="row mb-4 d-none d-sm-block">
          <div className="col-sm-12">
            <div className="text-right">
              <Tab to='#'>
                Agents
              </Tab>
              <Tab to='#'>
                Pending Approval
              </Tab>
              <Tab to='#'>
                Waiting Response
              </Tab>
              <Tab to='#'>
                Not Authorized
              </Tab>
            </div>
          </div>
        </div>
        {
          this.renderAgentsSection('Agents', 'Invite All')
        }
        <Divider />
        {
          this.renderAgentsSection('Pending approval', 'Approve All')
        }
        <Divider />
        {
          this.renderAgentsSection('Invitations waiting response', 'New Invite')
        }
        <Divider />
        {
          this.renderAgentsSection('Not Authorized', 'Message All')
        }
        <ModalWrapper
          isModalOpen={ isModalOpened }
          handleToggleModal={() => { this.setState({ isModalOpened: false }) }}
        >
          <AgentDetail
            onClose={ () => { this.setState({ isModalOpened: false }) } }
          />
        </ModalWrapper>
      </Container>
    )
  }

  renderAgentsSection = (sectionTitle: string, sectionAction: string): JSX.Element => {
    return (
      <React.Fragment>
        <div className="row mb-sm-3">
          <div className="col-sm-12 d-flex justify-content-between">
            <SectionTitle>
              { sectionTitle }
            </SectionTitle>
            <DesktopOnly>
              <ActionButton>
                { sectionAction }
              </ActionButton>
            </DesktopOnly>
          </div>
        </div>
        {
          this.handleRenderAgents([] ,'No investors on this project yet')
        }
        <MobileOnly>
          <ActionButton>
            { sectionAction }
          </ActionButton>
        </MobileOnly>
      </React.Fragment>
    );
  }

  agentClicked = (): void => {
    this.setState({ isModalOpened: true })
  }

  handleRenderAgents = (agents = [] ,emptyMsg: string): JSX.Element => {
    if (agents.length === 0) {
      return (
        <div className="row">
          <div className="col-sm-3 my-2">
            <AgentCard
              handleClick={ this.agentClicked }
            />
          </div>
          <div className="col-sm-3 my-2">
            <AgentCard
              handleClick={ this.agentClicked }
            />
          </div>
          <div className="col-sm-3 my-2">
            <AgentCard
              handleClick={ this.agentClicked }
            />
          </div>
          <div className="col-sm-3 my-2">
            <AgentCard
              handleClick={ this.agentClicked }
            />
          </div>
        </div>

      )
    }
    return (
      <div className="row">
        <div className="col-sm-12 d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
          { emptyMsg }
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
})


export default connect(mapStateToProps, mapDispatchToProps)(ProjectAgents)