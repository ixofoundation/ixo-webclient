import React from 'react'
import { Widget, send, open } from 'ixo-assistant'

interface Props {
  onMessageReceive: (text: string) => void
}

interface BotUtter {
  text: string
}

const Assistant: React.FunctionComponent<Props> = ({ onMessageReceive }) => {
  const onSocketEvent = {
    bot_uttered: (utter: BotUtter): void => onMessageReceive(utter.text),
    connect: (): void => localStorage.clear(),
    disconnect: (): void => localStorage.clear(),
  }

  return (
    <Widget
      socketUrl={process.env.REACT_APP_ASSISTANT_URL}
      socketPath={'/socket.io/'}
      title="IXO Assistant"
      onSocketEvent={onSocketEvent}
      storage="session"
      embedded={true}
      hideWhenNotConnected={false}
      connectOn="open"
    />
  )
}

export const startAssistant = (intent: string): void => {
  send(`/${intent}`)
  open()
}

export default Assistant
