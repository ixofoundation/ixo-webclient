import * as React from 'react'
import { WidgetWrapper } from 'common/components/Wrappers/WidgetWrapper'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import { ButtonTypes, Button } from 'common/components/Form/Buttons'
import {
  Actions,
  Col,
  Indicator,
  Mail,
  Section,
  Buttons,
  DidText,
  Heading,
  Hover,
  Selector,
} from './ManageAgents.styles'

export interface ParentProps {
  agents: any
  handleUpdateAgentStatus: (status: object, did: string, role: string) => void
}

export interface State {
  selectedAgents: string[]
}

class ManageAgents extends React.Component<ParentProps, State> {
  state: State = {
    selectedAgents: [],
  }

  handleUpdateAgentStatus = (
    status: string,
    statusObj: any,
    did: string,
    role: string,
  ): void => {
    if (statusObj === null) {
      this.props.handleUpdateAgentStatus({ status: status }, did, role)
    } else {
      this.props.handleUpdateAgentStatus(
        { status, version: statusObj.version },
        did,
        role,
      )
    }
  }

  handleAgentSelect = (agentDid: string): void => {
    let tempSelect = [...this.state.selectedAgents]
    if (tempSelect.includes(agentDid)) {
      tempSelect = tempSelect.filter((agent) => agentDid !== agent)
      this.setState({ selectedAgents: tempSelect })
    } else {
      tempSelect.push(agentDid)
      this.setState({ selectedAgents: tempSelect })
    }
  }

  handleIsSelected = (agentDid: string): string => {
    if (this.state.selectedAgents !== null) {
      return this.state.selectedAgents.includes(agentDid) ? 'selected' : ''
    }
    return ''
  }

  handleRoleLabel = (role: string): string => {
    if (role === 'IA') {
      return 'Investors'
    }
    if (role === 'EA') {
      return 'Evaluators'
    }
    if (role === 'SA') {
      return 'Service Providers'
    }
    return role
  }

  handleRenderSection = (
    iconClass: string,
    agents: any[],
    colorClass: string,
    title: string,
    key: number,
  ): JSX.Element => {
    return (
      <Section className="row" key={key}>
        <div className="col-12">
          <h3>
            <i className={iconClass} />
            {title}
          </h3>
        </div>
        {agents.map((agent, index) => {
          const currentStatus = agent.currentStatus.status
          return (
            <Col className="col-xl-3 col-md-6" key={index}>
              <WidgetWrapper title={agent.name}>
                <Indicator color={colorClass} />
                <DidText>
                  <strong>DID: </strong>
                  {agent.agentDid}
                </DidText>
                <Mail href={`mailto:${agent.email}`}>{agent.email}</Mail>
                <Hover>
                  <Actions>
                    <Selector
                      onClick={(): void =>
                        this.handleAgentSelect(agent.agentDid)
                      }
                    >
                      <div className={this.handleIsSelected(agent.agentDid)} />
                    </Selector>
                    <Buttons>
                      <Button
                        type={ButtonTypes.dark}
                        disabled={currentStatus === '2'}
                        onClick={(): void =>
                          this.handleUpdateAgentStatus(
                            '2',
                            agent.currentStatus,
                            agent.agentDid,
                            agent.role,
                          )
                        }
                      >
                        <i className="icon-close" />
                      </Button>
                      <Button
                        type={ButtonTypes.gradient}
                        disabled={currentStatus === '1'}
                        onClick={(): void =>
                          this.handleUpdateAgentStatus(
                            '1',
                            agent.currentStatus,
                            agent.agentDid,
                            agent.role,
                          )
                        }
                      >
                        <i className="icon-approvetick" />
                      </Button>
                    </Buttons>
                  </Actions>
                </Hover>
              </WidgetWrapper>
            </Col>
          )
        })}
      </Section>
    )
  }

  handleMapAgents = (): Array<unknown> => {
    const approved = []
    const pending = []
    const revoked = []
    const sections = []
    this.props.agents.map((agent) => {
      if (agent.currentStatus === null) {
        pending.push(agent)
      } else {
        switch (agent.currentStatus.status) {
          case '1':
            approved.push(agent)
            break
          case '2':
            revoked.push(agent)
            break
          case '0':
          default:
            pending.push(agent)
            break
        }
      }
    })

    pending.push({
      name: 'Joyce Montgomery',
      agentDid: 'test-did',
      role: 'Test Role',
      currentStatus: '1',
    })

    pending.length > 0 &&
      sections.push(
        this.handleRenderSection(
          'icon-pending',
          pending,
          '#F89D28',
          'Pending Approval',
          1,
        ),
      )
    approved.length > 0 &&
      sections.push(
        this.handleRenderSection(
          'icon-approved',
          approved,
          '#5AB946',
          'Approved',
          2,
        ),
      )
    revoked.length > 0 &&
      sections.push(
        this.handleRenderSection(
          'icon-rejected',
          revoked,
          '#E2223B',
          'Rejected',
          3,
        ),
      )

    return sections
  }

  render(): JSX.Element {
    return (
      <LayoutWrapper>
        <div className="row">
          <div className="col-12">
            <Heading>{this.handleRoleLabel(this.props.agents[0].role)}</Heading>
          </div>
        </div>
        {this.handleMapAgents()}
      </LayoutWrapper>
    )
  }
}

export default ManageAgents
