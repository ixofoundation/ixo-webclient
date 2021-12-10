import Widget from 'rasa-webchat'
import React, {
  FormEvent,
  useRef,
  useEffect,
  Dispatch,
  useState,
  useCallback,
} from 'react'
import useBot from 'react-rasa-assistant'
import ArrowUp from 'assets/icons/ArrowUp'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { connect } from 'react-redux'
import { AgentRole } from 'modules/Account/types'
import { RootState } from 'common/redux/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { UserInfo } from 'modules/Account/types'
import TextareaAutosize from 'react-textarea-autosize'
import Axios from 'axios'
import keysafe from 'common/keysafe/keysafe'
import * as base58 from 'bs58'
import * as Toast from 'common/utils/Toast'

interface AssistantProps {
  initMsg: string
  userInfo?: UserInfo
  userAddress?: string
  userAccountNumber?: string
  userSequence?: string
  params: any
  handleCreateEntityAgent?: (
    email: string,
    name: string,
    role: AgentRole,
  ) => void
}

const Assistant: React.FunctionComponent<AssistantProps> = ({
  initMsg,
  params,
  userInfo,
  userAddress,
  userAccountNumber,
  userSequence,
  handleCreateEntityAgent,
}) => {
  return (
    <Widget
      initPayload={'/get_started'}
      socketUrl={process.env.REACT_APP_ASSISTANT_URL}
      socketPath={'/socket.io/'}
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
  handleCreateEntityAgent: (
    email: string,
    name: string,
    role: AgentRole,
  ): void => dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
