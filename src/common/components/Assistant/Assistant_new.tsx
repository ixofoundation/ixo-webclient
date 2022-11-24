import { RootState } from 'common/redux/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { AgentRole, UserInfo } from 'modules/Account/types'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
// @ts-ignore
import Widget from 'rasa-webchat'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'

interface AssistantProps {
  initMsg: string
  userInfo?: UserInfo
  userAddress?: string
  userAccountNumber?: string
  userSequence?: string
  params: any
  handleCreateEntityAgent?: (email: string, name: string, role: AgentRole) => void
}

const Assistant: React.FunctionComponent<AssistantProps> = ({ initMsg }) => {
  return (
    <Widget
      initPayload={initMsg}
      socketUrl={'http://80.71.57.76'}
      socketPath={'/socket.io/'}
      hideWhenNotConnected={false}
      customData={{ language: 'en' }} // arbitrary custom data. Stay minimal as this will be added to the socket
      title={'Title'}
    />
  )
}

const mapStateToProps = (state: RootState): any => ({
  userInfo: accountSelectors.selectUserInfo(state),
  userAddress: accountSelectors.selectUserAddress(state),
  userAccountNumber: accountSelectors.selectUserAccountNumber(state),
  userSequence: accountSelectors.selectUserSequence(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (email: string, name: string, role: AgentRole): void =>
    dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
