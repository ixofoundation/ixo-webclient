import * as React from 'react'
import styled from 'styled-components'
import { WidgetWrapper } from '../common/WidgetWrapper'
import { LayoutWrapper } from '../common/LayoutWrapper'
import { ButtonTypes, Button } from '../common/Buttons'

const Heading = styled.h2`
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
`

const Section = styled.section`
  padding-bottom: 30px;
  border-bottom: 1px solid #164a63;
  margin-bottom: 30px;

  h3 {
    color: white;
    font-size: 22px;
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};

    i {
      font-size: 25px;
      margin-right: 10px;
    }

    i.icon-pending:before {
      color: #f89d28;
    }
    i.icon-approved:before {
      color: #5ab946;
    }
    i.icon-rejected:before {
      color: #e2223b;
    }
  }
`

const Indicator = styled.div`
  width: 7px;
  height: 25px;
  position: absolute;
  top: 18px;
  left: -7px;

  background: ${/* eslint-disable-line */ props => props.color};
`

const Mail = styled.a``

const Col = styled.div`
  font-size: 15px;
  font-weight: 300;

  ${Mail} {
    color: #5094ac;
    text-decoration: none;
    display: block;
  }

  p {
    margin: 0;
  }

  ${Mail}:hover {
    color: white;
    font-weight: 600;
  }

  > div {
    position: relative;
    padding-bottom: 50px;
  }
`

const Hover = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  > a {
    padding-left: 30px;
    padding-right: 30px;
  }

  :hover {
    opacity: 1;
  }
`

const Actions = styled.div`
  position: absolute;
  top: 20px;
  width: calc(100% - 40px);

  display: flex;
  justify-content: space-between;
`

const Selector = styled.div`
  opacity: 0;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  background: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  padding: 2px;
  border-radius: 50%;

  > div {
    background: ${/* eslint-disable-line */ props =>
      props.theme.fontDarkBlueButtonHover};
    width: 100%;
    border-radius: 50%;
    height: 100%;
    opacity: 0;

    transition: opacity 0.3s ease;
  }

  > div.selected {
    opacity: 1;
  }
`

const Buttons = styled.div`
  display: flex;

  a {
    display: block;
    width: 30px;
    height: 30px;
    padding: 5px;
    margin: 0 0 0 10px;
  }
  i:before {
    color: white;
  }

  a:not(.disabled):hover {
    background: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }
`

const DidText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`

export interface ParentProps {
  agents: any
  handleUpdateAgentStatus: (status: object, did: string, role: string) => void
}

export interface State {
  selectedAgents: string[]
}
export class ProjectAgents extends React.Component<ParentProps, State> {
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
      tempSelect = tempSelect.filter(agent => agentDid !== agent)
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
                  {/* <Button onClick={() => console.log('clicked')} type={ButtonTypes.dark}>View</Button> */}
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
    this.props.agents.map(agent => {
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
