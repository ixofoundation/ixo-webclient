import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { toggleAssistant } from 'modules/Account/Account.actions'
import AssistantIcon from 'assets/images/icon-assistant.svg'
import { useDispatch } from 'react-redux'
interface ValueProps {
  value: number
  moniker: string
  validatorAddress: string
}

const ValueComponentContainer = styled.div`
  background: #e9edf5;
  display: flex;
  align-items: center;
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  line-height: 200%;
  flex-grow: 2;
  justify-content: center;
  img {
    margin-right: 1em;
  }
`

const StyledAssistantContainer = styled.div`
  background-color: #e9edf5;
  width: 4em;
  padding: 1.3em 0;
  border-left: 3px solid #f7f9fd;
  cursor: pointer;
`

const Value: FunctionComponent<ValueProps> = ({ 
  value,
  moniker,
  validatorAddress,
}) => {
  const dispatch = useDispatch()

  const handleAssistance = () => {
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/stake{"operator_address":"","moniker":"${moniker}","user_did":","${validatorAddress}","trigger":"proto_msg"}`
      }),
    )
  }

  return (
  <ValueComponentContainer>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
    <StyledAssistantContainer onClick={handleAssistance}>
      <img alt="" src={AssistantIcon} />
    </StyledAssistantContainer>
  </ValueComponentContainer>
)}

export default Value
