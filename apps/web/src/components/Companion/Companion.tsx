import { Flex } from '@mantine/core'
import { useCompanion } from 'hooks/useCompanion'
import { Toolbar } from './Toolbar'
import ChatHistory from './ChatHistory'
import Conversation from './Conversation'

const Companion = () => {
  const { isCompanionOpen } = useCompanion()

  if (!isCompanionOpen) return null

  return (
    <Flex pos='absolute' h='100%' w='100%' bg='transparent' c='white' top={75} style={{ zIndex: 5 }}>
      <Flex w='100%' h='100%'>
        <Flex flex={1}>
          <ChatHistory />
          <Conversation />
        </Flex>
        <Toolbar/>
      </Flex>
    </Flex>
  )
}

export default Companion
