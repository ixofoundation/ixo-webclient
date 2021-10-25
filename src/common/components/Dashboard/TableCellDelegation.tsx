import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
// import { toggleAssistant } from 'modules/Account/Account.actions'
import AssistantIcon from 'assets/images/icon-assistant.svg'
// import { useDispatch } from 'react-redux'
import * as keplr from 'common/utils/keplr'
interface DelegationProps {
  value: number
  moniker: string
  validatorAddress: string
  userDid: string
}

const ValueComponentContainer = styled.div`
  background: #143F54;
  display: flex;
  align-items: center;
  min-width: 200px;
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  line-height: 100%;
  flex-grow: 2;
  justify-content: center;
  font-weight: bold;
  white-space: pre-line;
  img {
    margin-right: 1em;
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
  value,
  // moniker,
  // validatorAddress,
  // userDid,
}) => {
  // const dispatch = useDispatch()

  const handleAssistance = async () => {
    // dispatch(
    //   toggleAssistant({
    //     fixed: false,
    //     intent: `/stake{"operator_address":"${validatorAddress}","moniker":"${moniker}","user_did":"${userDid}","trigger":"proto_msg"}`
    //   }),
    // )
    const [accounts, offlineSigner] = await keplr.connectAccount()

    console.log(accounts, offlineSigner)
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

export default Delegation
