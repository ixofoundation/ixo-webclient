// @ts-ignore
import Widget from 'rasa-webchat'
import React from 'react'

interface AssistantProps {
  initMsg: string
  params: any
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

export default Assistant
