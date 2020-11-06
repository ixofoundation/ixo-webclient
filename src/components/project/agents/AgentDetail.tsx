import * as React from 'react'
import styled from 'styled-components'
import Call from 'assets/icons/Call'
import Message from 'assets/icons/Message'
import Linkedin from 'assets/icons/Linkedin'
import Twitter from 'assets/icons/Twitter'
import Github from 'assets/icons/Github'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import { deviceWidth } from 'lib/commonData'
import Tick from 'assets/icons/Tick'
import Texting from 'assets/icons/Texting'
import Cross from 'assets/icons/Cross'
import Expand from 'common/components/Animation/Expand'

const Logos = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 9.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  margin-top: 1.5rem;
  width: 100%;

  > svg {
    cursor: pointer;
    margin-right: 1rem;
  }
`

const Details = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${deviceWidth.mobile}px) {
    flex-direction: column;
  }

`
const Name = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: .2rem;
`

const Job = styled.div`
  color: #83D9F2;
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
  margin-top: 0.75rem;
  max-width: 200px;
`

const Exclamation = styled.div`
  color: #39C3E6;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 7px;
`

const DetailContainer = styled.div`
  min-width: 567px;
  min-height: 600px;
  padding-top: 1.75rem;
  padding-bottom: 0.5rem;
  @media (max-width: ${deviceWidth.mobile}px) {
    min-width: auto;
  }
`

const Avatar = styled.img`
  width: 137px;
  height: 137px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    background: #022D43;
    padding: 0.5rem 1rem;
    margin-bottom: 0.4rem;
  }
`

const Bullet = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: ${props => props.color ? props.color : '#ffffff'};
  border-radius: 1rem;
  margin-right: 0.625rem;
`

const ClaimLabel = styled.span`
  font-size: 14px;
`

const Divider = styled.hr`
  border-color: #143F54;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  @media (max-width: ${deviceWidth.mobile}px) {
    margin-top: 0.75rem;
  }
`
const ButtonWrapper = styled.div`
  width: 120px;
  margin-left: auto;
  margin-top: 1.25rem;
`

const ActionButtonContainer = styled.div`
  border-top: 1px solid #143F54;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  width: 100%;
`

const ActionButton = styled.button`
  border-radius: 4px;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontDarkBlueButtonHover};
  font-size: 1rem;
  border: 1px solid #29C7ED;
  font-weight: bold;
  background: transparent;
  padding: 0.4rem 1rem;
  transition: all 0.3s ease;
  > svg {
    margin-left: 1rem;
  }

  &.green {
    background: linear-gradient(180deg, #41C1E4 0%, #49BFE0 100%);
    color: white;
    border-width: 0;

    :hover {
      background: ${/* eslint-disable-line */ (props) =>
        props.theme.bg.fontDarkBlue};
      color: ${/* eslint-disable-line */ (props) => props.theme.fontDarkBlueButtonHover};
    }
  }

  :hover {
    background: ${/* eslint-disable-line */ (props) =>
      props.theme.bg.darkButton};
    color: white;
  }
`

export interface Props {
  onClose: () => void
}

const AgentDetail : React.FunctionComponent<Props> = ({onClose}) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <DetailContainer>
      <div
        onMouseEnter={ ():void => setExpanded(true) }
        onMouseLeave={ ():void => setExpanded(false) }
      >
      <Details
      >
        <Avatar src={ require('assets/images/user-thumb.png') } className="mb-2 mb-sm-0 mr-sm-3" />
        <div className="d-flex flex-column flex-grow-1 ml-3 align-items-sm-start align-items-center">
          <Name>
            Joyce Montegomery
          </Name>
          <Job>
            Co-Founder & CEO
          </Job>
          <Username>
            <Exclamation>!</Exclamation>Username
          </Username>
          <Logos>
            <Call fill="#39C3E6" />
            <Message fill="#39C3E6" />
            <Linkedin />
            <Twitter />
            <Github />
            <div className="d-flex align-items-center ml-auto">
              <img src={ require('assets/images/agents/icon-shield.svg') } alt="shield" />
              <img src={ require('assets/images/agents/icon-shield.svg') } className="ml-3" alt="shield" />
              <img src={ require('assets/images/agents/icon-shield.svg') } className="ml-3" alt="shield" />
            </div>
          </Logos>
        </div>
      </Details>
      <Expand
        expanded={ expanded }
      >
        <ActionButtonContainer
        >
          <ActionButton
          >
            Message
            <Texting />
          </ActionButton>
          <div className="d-flex">
            <ActionButton
              className="mr-2"
            >
              Reject
              <Cross />
            </ActionButton>
            <ActionButton
              className="green"
            >
              Authorize
              <Tick />
            </ActionButton>
          </div>
        </ActionButtonContainer>
      </Expand>
      </div>
      <Divider />
      <ItemsContainer>
        <div className="d-flex align-items-center rounded">
          <img src={ require('assets/images/agents/icon-user.svg') } className="mr-4" alt="user" />
          <div>
            Joined 23/06/2020
          </div>
        </div>
        <div className="d-flex align-items-center rounded">
          <img src={ require('assets/images/agents/icon-copy.svg') } className="mr-4" alt="copy" />
          <div>
            ID ixo4fnweoiw40i4tr0fowe 24f090rp2i3nr
          </div>
        </div>
        <div className="d-flex align-items-center rounded">
          <img src={ require('assets/images/agents/icon-messages.svg') } className="mr-4" alt="messages" />
          <div className="flex-grow-1">
            3 New Messages
          </div>
          <img src={ require('assets/images/agents/icon-launch.svg') } />
        </div>
        <div className="d-flex align-items-center rounded">
          <img src={ require('assets/images/agents/icon-documents.svg') } className="mr-4" alt="documents" />
          <div className="flex-grow-1">
            5 Documents
          </div>
          <img src={ require('assets/images/agents/icon-launch.svg') } alt="launch" />
        </div>
        <div className="d-flex rounded">
          <div>
            <img src={ require('assets/images/agents/icon-claims.svg') } className="mr-4" alt="claims" />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <div className="flex-grow-1">
                38 Claims
              </div>
              <img src={ require('assets/images/agents/icon-launch.svg') } alt="launch" />
            </div>
            <div>
              <div className="d-flex align-items-center">
                <Bullet color="#6FCF97" /> <span className="font-weight-bold mr-1">27</span> <ClaimLabel>Approved</ClaimLabel>
              </div>
              <div className="d-flex align-items-center">
                <Bullet color="#F89D28" /> <span className="font-weight-bold mr-1">27</span> <ClaimLabel>Pending</ClaimLabel>
              </div>
              <div className="d-flex align-items-center">
                <Bullet color="#E2223B" /> <span className="font-weight-bold mr-1">27</span> <ClaimLabel>Rejected</ClaimLabel>
              </div>
              <div className="d-flex align-items-center">
                <Bullet color="#033C50" /> <span className="font-weight-bold mr-1">27</span> <ClaimLabel>remaining claims</ClaimLabel>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex rounded">
          <div>
            <img src={ require('assets/images/agents/icon-payments.svg') } className="mr-4" alt="payments" />
          </div>
          <div className="mr-2 mr-sm-5">
            Payments
          </div>
          <div>
            <div className="d-flex align-items-center">
              <Bullet color="#6FCF97" /> <span className="font-weight-bold mr-2">Paid</span> <ClaimLabel>xEUR 280.00</ClaimLabel>
            </div>
            <div className="d-flex align-items-center">
              <Bullet color="#F89D28" /> <span className="font-weight-bold mr-2">Owed</span> <ClaimLabel>xEUR 1,230.25</ClaimLabel>
            </div>
          </div>
          <div className="ml-auto">
            <img src={ require('assets/images/agents/icon-launch.svg') } alt="launch" />
          </div>
        </div>
      </ItemsContainer>
      <ButtonWrapper >
        <Button type={ ButtonTypes.dark } onClick={ onClose }>
          Close
        </Button>
      </ButtonWrapper>

    </DetailContainer>
  )
};

export default AgentDetail;
