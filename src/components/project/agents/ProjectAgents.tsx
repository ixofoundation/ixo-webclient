import * as React from 'react'

import {
  Tab,
  SectionTitle,
  ActionButton,
  Divider,
} from './ProjectAgents.styles'

import AgentCard from './AgentCard'
import AgentDetail from './AgentDetail'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'

export interface ParentProps {
  agents: any
  handleUpdateAgentStatus: (status: object, did: string, role: string) => void
}

export interface State {
  isModalOpened: boolean
}

export class ProjectAgents extends React.Component<ParentProps, State> {
  state: State = {
    isModalOpened: false
  }
  
  render() {
    const { isModalOpened } = this.state;
    return (
      <div className="container-fluid text-white">
        <div className="row mb-4">
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
        <div className="row mb-3">
          <div className="col-sm-12 d-flex justify-content-between">
            <SectionTitle>
              Investors
            </SectionTitle>
            <ActionButton>
              Invite
            </ActionButton>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {
              this.handleRenderAgents([] ,'No investors on this project yet')
            }
          </div>
        </div>
        <Divider />
        <ModalWrapper
          isModalOpen={ isModalOpened }
          handleToggleModal={() => { this.setState({ isModalOpened: false }) }}
        >
          <AgentDetail />
        </ModalWrapper>
      </div>
    )
  }

  agentClicked = () => {
    
  }

  handleRenderAgents = (agents = [] ,emptyMsg: string) => {
    if (agents.length === 0) {
      return (
        <div className="row">
          <div className="col-sm-3">
            <AgentCard />
          </div>
          <div className="col-sm-3">
            <AgentCard />
          </div>
          <div className="col-sm-3">
            <AgentCard />
          </div>
          <div className="col-sm-3">
            <AgentCard />
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