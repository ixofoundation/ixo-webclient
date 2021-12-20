import React from 'react'
import { Message } from './StatusMessage.styles'
// import SuccessIcon from 'assets/icons/Success'
// import SendingIcon from 'assets/icons/Send'
// import ErrorIcon from 'assets/icons/Close'
import Lottie from 'react-lottie'
import pendingAnimation from 'assets/animations/transaction/blue_pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'

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
  // let Icon
  let animationData
  switch (messageType) {
    case MessageType.Success:
      // Icon = <SuccessIcon width="132" fill="#6FCF97" />
      animationData = successAnimation
      break
    case MessageType.Sending:
      // Icon = <SendingIcon width="132" fill="#49BFE0" />
      animationData = pendingAnimation
      break
    case MessageType.Error:
      // Icon = <ErrorIcon width="132" fill="firebrick" />
      animationData = errorAnimation
      break
  }

  return (
    <Message>
      <div className={`${repeatPulse ? 'repeat' : ''}`}>
        {/* {Icon} */}
        <Lottie
          height={200}
          width={200}
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
          }}
        />
      </div>
      <h2>{message}</h2>
      {children}
    </Message>
  )
}

export default StatusMessage
