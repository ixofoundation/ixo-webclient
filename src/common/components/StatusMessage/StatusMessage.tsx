import Lottie from 'react-lottie'
import { Message } from './StatusMessage.styles'
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

const StatusMessage: React.FunctionComponent<Props> = ({ repeatPulse, message, messageType, children }) => {
  let animationData
  switch (messageType) {
    case MessageType.Success:
      animationData = successAnimation
      break
    case MessageType.Sending:
      animationData = pendingAnimation
      break
    case MessageType.Error:
      animationData = errorAnimation
      break
  }

  return (
    <Message>
      <div className={`${repeatPulse ? 'repeat' : ''}`}>
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
