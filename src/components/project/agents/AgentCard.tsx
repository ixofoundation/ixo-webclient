import * as React from 'react'
import styled from 'styled-components'
import Call from 'assets/icons/Call'
import Message from 'assets/icons/Message'
import Linkedin from 'assets/icons/Linkedin'
import Twitter from 'assets/icons/Twitter'
import Github from 'assets/icons/Github'

const CardContainer = styled.div`
  width: 100%;
  height: 158px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #083347;
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Logos = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 9.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;

  svg {
    cursor: pointer;
  }
`

const Details = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`
const Name = styled.h3`
  color: #fff;
  font-size: 1.125rem;
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
  margin-top: 5px;
`

const Exclamation = styled.div`
  color: #39C3E6;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 7px;
`

const Avatar = styled.img`
  width: 88px;
  height: 88px;
`

export interface Props {
  handleClick: () => void
}

const AgentCard: React.FunctionComponent<Props> = ({handleClick}) => {
  return (
    <CardContainer onClick={ () => handleClick() }>
      <Details>
        <Avatar src={ require('assets/images/user-thumb.png') } className="mr-1" />
        <div className="d-flex flex-column flex-grow-1 ml-2">
          <Name>
            Joyce Montegomery
          </Name>
          <Job>
            Co-Founder & CEO
          </Job>
          <Username>
            <Exclamation>!</Exclamation>Username
          </Username>
        </div>
      </Details>
      <Logos>
        <Call fill="#39C3E6" />
        <Message fill="#39C3E6" />
        <Linkedin />
        <Twitter />
        <Github />
      </Logos>
    </CardContainer>
  )
};

export default AgentCard;
