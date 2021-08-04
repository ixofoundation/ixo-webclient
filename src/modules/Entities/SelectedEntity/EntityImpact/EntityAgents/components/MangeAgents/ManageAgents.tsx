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
import { AgentStatus, EntityAgent } from '../../types'
import { AgentRole } from 'modules/Account/types'
import { agentRoleMap } from 'modules/Account/strategy-map'

export interface Props {
  role: AgentRole
  agents: EntityAgent[]
  handleUpdateAgentStatus: (agentDid: string, status: AgentStatus) => void
}

export interface State {
  selectedAgents: string[]
}

class ManageAgents extends React.Component<Props, State> {
  state: State = {
    selectedAgents: [],
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

  handleRenderSection = (
    iconClass: string,
    agents: EntityAgent[],
    colorClass: string,
    title: string,
    key: number,
  ): JSX.Element => {
    const { handleUpdateAgentStatus } = this.props
    return (
      <Section className="row" key={key}>
        <div className="col-12">
          <h3>
            <i className={iconClass} />
            {title}
          </h3>
        </div>
        {agents.map((agent, index) => {
          const { agentDid, status } = agent
          return (
            <Col className="col-xl-3 col-md-6" key={index}>
              <WidgetWrapper title={agent.name}>
                <Indicator color={colorClass} />
                <DidText>
                  <strong>DID: </strong>
                  {agentDid}
                </DidText>
                <Mail href={`mailto:${agent.email}`}>{agent.email}</Mail>
                <Hover>
                  <Actions>
                    <Selector
                      onClick={(): void => this.handleAgentSelect(agentDid)}
                    >
                      <div className={this.handleIsSelected(agentDid)} />
                    </Selector>
                    <Buttons>
                      <Button
                        type={ButtonTypes.dark}
                        disabled={status === AgentStatus.Revoked}
                        onClick={(): void =>
                          handleUpdateAgentStatus(agentDid, AgentStatus.Revoked)
                        }
                      >
                        <i className="icon-close" />
                      </Button>
                      <Button
                        type={ButtonTypes.gradient}
                        disabled={status === AgentStatus.Approved}
                        onClick={(): void =>
                          handleUpdateAgentStatus(
                            agentDid,
                            AgentStatus.Approved,
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
    this.props.agents.forEach((agent) => {
      if (agent.status === null) {
        pending.push(agent)
      } else {
        switch (agent.status) {
          case AgentStatus.Approved:
            approved.push(agent)
            break
          case AgentStatus.Revoked:
            revoked.push(agent)
            break
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
    const { role } = this.props
    return (
      <LayoutWrapper>
        <div className="row">
          <div className="col-12">
            <Heading>{agentRoleMap[role].plural}</Heading>
          </div>
        </div>
        {this.handleMapAgents()}
      </LayoutWrapper>
    )
  }
}

export default ManageAgents
