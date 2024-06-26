import { Flex } from '@mantine/core'

import Conversation from './Conversation'
import QueryInput from './QueryInput'
import { useCompanion } from 'hooks/useCompanion'
import { useEffect } from 'react'

export default function Assistant() {
  const { messages, sendMessage, newChat, assistant } = useCompanion()

  useEffect(() => {
    if(messages.length === 0 && assistant){
      newChat()
    }
  }, [newChat, assistant])
  
  return (
    <Flex
      direction='column'
      justify='space-between'
      h='100%'
      style={{ borderRadius: '16px' }}
    >
      <Flex direction='column' justify='flex-end' style={{ flexGrow: 1 }}>
        <Conversation messages={messages} />
        <QueryInput sendMessage={sendMessage}/>
      </Flex>
    </Flex>
  )
}
