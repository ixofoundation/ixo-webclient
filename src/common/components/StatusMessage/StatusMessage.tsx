import React from 'react'
import { Message } from './StatusMessage.styles'
import SuccessIcon from 'assets/icons/Success'
import SendingIcon from 'assets/icons/Send'
import ErrorIcon from 'assets/icons/Close'

export enum MessageType {
  Success = 'Success',
  Sending = 'Sending',
  Error = 'Error',
}

interface Props {
  repeatPulse: boolean
  message: string
  messageType: MessageType
}

const StatusMessage: React.FunctionComponent<Props> = ({
  repeatPulse,
  message,
  messageType,
  children,
}) => {
  let Icon
  switch (messageType) {
    case MessageType.Success:
      Icon = <SuccessIcon width="132" fill="#6FCF97" />
      break
    case MessageType.Sending:
      Icon = <SendingIcon width="132" fill="#49BFE0" />
      break
    case MessageType.Error:
      Icon = <ErrorIcon width="132" fill="firebrick" />
      break
  }

  return (
    <Message>
      <div className={`icon-pulse-wrapper ${repeatPulse ? 'repeat' : ''}`}>
        {Icon}
      </div>
      <h2>{message}</h2>
      {children}
    </Message>
  )
}

export default StatusMessage
