import { Flex } from '@mantine/core'
import { useCompanion } from 'hooks/useCompanion'
import ChatHistory from './ChatHistory'
import Conversation from './Conversation'
import { Toolbar } from './Toolbar'

const Companion = () => {
  const { isCompanionOpen } = useCompanion()

  if (!isCompanionOpen) return null

  return (
    <Flex pos='absolute' w='100%' h='calc(100% - 74px)' bg='transparent' c='white' bottom={0} style={{ zIndex: 5 }}>
      <Flex w='100%' h='100%'>
        <Flex flex={1}>
          <ChatHistory />
          <Conversation />
        </Flex>
        <Toolbar />
      </Flex>
    </Flex>
  )
}

export default Companion
