import * as React from 'react'
import styled from 'styled-components'
// import Call from 'assets/icons/Call'
// import Message from 'assets/icons/Message'
// import Linkedin from 'assets/icons/Linkedin'
// import Twitter from 'assets/icons/Twitter'
// import Github from 'assets/icons/Github'
import Expand from 'common/components/Animation/Expand'
import Tick from 'assets/icons/Tick'
import Texting from 'assets/icons/Texting'
import Cross from 'assets/icons/Cross'
import { deviceWidth } from 'lib/commonData'
import { AgentRole } from 'modules/Account/types'
import {
  AgentStatus,
  EntityAgent,
} from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/types'

const CardWrapper = styled.div`
  height: 158px;
`

const CardContainer = styled.div`
  width: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #083347;
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
// const Logos = styled.div`
//   display: flex;
//   align-items: flex-end;
//   justify-content: space-between;
//   width: 9.5rem;
//   padding-bottom: 0.5rem;
//   padding-left: 0.5rem;
//   margin-top: 0.4rem;

//   svg {
//     cursor: pointer;
//   }
// `

const Details = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`
const Name = styled.h3`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
`

const Job = styled.div`
  color: #83d9f2;
  font-size: 0.75rem;
`
const Username = styled.div`
  background: #002233;
  background-blend-mode: multiply;
  mix-blend-mode: normal;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.75rem;
  padding: 0.325rem 0.625rem;
  display: flex;
  align-items: center;
  margin-top: 5px;

  a {
    color: inherit;
    text-decoration: none;
  }
`

const Exclamation = styled.div`
  color: #39c3e6;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 7px;
`

const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
`

const ActionButtonContainer = styled.div`
  border-top: 1px solid #143f54;
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  width: 100%;
  margin-top: 0.3rem;
`

const ActionButton = styled.button`
  border-radius: 4px;
  color: ${/* eslint-disable-line */ (props) =>
    props.theme.fontDarkBlueButtonHover};
  font-size: 0.75rem;
  border: 1px solid #29c7ed;
  font-weight: bold;
  background: transparent;
  padding: 0.3rem 0.6rem;
  transition: all 0.3s ease;
  > svg {
    margin-left: 1rem;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    > svg {
      margin-left: 0.5rem !important;
    }
  }

  &.green {
    background: linear-gradient(180deg, #41c1e4 0%, #49bfe0 100%);
    color: white;
    border-width: 0;

    :hover {
      background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.fontDarkBlue};
      color: ${/* eslint-disable-line */ (props) =>
    props.theme.fontDarkBlueButtonHover};
    }
  }

  :hover {
    background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.darkButton};
    color: white;
  }
`

export interface Props {
  agentStatus: AgentStatus,
  agent: EntityAgent
  handleClick: () => void
  handleAuthorize: (agent: EntityAgent) => void
  handleDeAuthorize: (agent: EntityAgent) => void
  handleReject: (agent: EntityAgent) => void
}

const AgentCard: React.FunctionComponent<Props> = ({
  agentStatus,
  agent,
  handleClick,
  handleAuthorize,
  handleReject,
  handleDeAuthorize
}) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleAuthorizeClick = (event: React.SyntheticEvent): void => {
    event.stopPropagation()

    handleAuthorize(agent)
  }

  const handleDeAuthorizeClick = (event: React.SyntheticEvent): void => {
    event.stopPropagation()

    handleDeAuthorize(agent)
  }

  // const handleRejectClick = (event: React.SyntheticEvent): void => {
  //   event.stopPropagation()

  //   handleReject(agent)
  // }

  return (
    <CardWrapper>
      <CardContainer
        onClick={(): void => handleClick()}
        onMouseEnter={(): void => setExpanded(true)}
        onMouseLeave={(): void => setExpanded(false)}
      >
        <Details>
          <Avatar
            src={require('assets/images/user-thumb.png')}
            className="mr-1"
          />
          <div className="d-flex flex-column flex-grow-1 ml-2 pb-3">
            <Name>{agent.name}</Name>
            <Job>
              {agent.role === AgentRole.ServiceProvider
                ? 'Service Provider'
                : 'Evaluator'}
            </Job>
            <Username>
              <a
                href={`mailto:${agent.email}`}
                onClick={(event): void => {
                  event.stopPropagation()
                }}
              >
                <Exclamation></Exclamation>
                {agent.email}
              </a>
            </Username>
            {/* <Logos>
            <Call fill="#39C3E6" />
            <Message fill="#39C3E6" />
            <Linkedin />
            <Twitter />
            <Github />
          </Logos> */}
          </div>
        </Details>
        <Expand expanded={expanded}>
          <ActionButtonContainer>
            <a
              href={`mailto:${agent.email}`}
              onClick={(event): void => {
                event.stopPropagation()
              }}
            >
              <ActionButton>
                Message
                <Texting />
              </ActionButton>
            </a>
            {agentStatus === AgentStatus.Approved ? (

              <div className="d-flex">
                <ActionButton onClick={handleDeAuthorizeClick}>
                  DeAuthorize
                  <Cross />
                </ActionButton>
              </div>
            ) : (
              <div className="d-flex">
                {/* <ActionButton
                  className="mr-1 mr-sm-2"
                  onClick={handleRejectClick}
                >
                  Reject
                  <Cross />
                </ActionButton> */}
                <ActionButton className="green" onClick={handleAuthorizeClick}>
                  Authorize
                  <Tick />
                </ActionButton>
              </div>
            )}

          </ActionButtonContainer>
        </Expand>
      </CardContainer>
    </CardWrapper>
  )
}

export default AgentCard
