import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import AssistantIcon from 'assets/images/icon-assistant.svg'
import * as keplr from 'common/utils/keplr'
interface DelegationProps {
  delegation: string
  reward: string
}

const ValueComponentContainer = styled.div`
  background: #143f54;
  display: flex;
  align-items: center;
  min-width: 200px;
`

const StyledValueContainer = styled.div`
  padding: 0;
  display: flex;
  line-height: 100%;
  flex-grow: 2;
  justify-content: center;
  font-weight: bold;
  flex-direction: column;

  & > span:first-child {
    font-size: 16px;
    line-height: 24px;
  }
  & > span:last-child {
    font-size: 14px;
    line-height: 24px;
  }
`

const StyledAssistantContainer = styled.div`
  background-color: #107591;
  width: 4em;
  padding: 1.3em 0;
  border-left: 3px solid #023044;
  cursor: pointer;
`

const Delegation: FunctionComponent<DelegationProps> = ({
  delegation,
  reward,
}) => {
  const handleAssistance = async (): Promise<void> => {
    const [accounts, offlineSigner] = await keplr.connectAccount()

    console.log(accounts, offlineSigner)
  }

  return (
    <ValueComponentContainer>
      <StyledValueContainer>
        <span>{delegation}</span>
        <span>{reward}</span>
      </StyledValueContainer>
      <StyledAssistantContainer onClick={handleAssistance}>
        <img alt="" src={AssistantIcon} />
      </StyledAssistantContainer>
    </ValueComponentContainer>
  )
}

export default Delegation
