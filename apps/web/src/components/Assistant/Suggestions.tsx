import { Flex } from '@mantine/core'

import SuggestionButton from './SuggestionButton'

type Props = {
  sendMessage: (message?: string) => void
  messages: string[]
  isOpen: boolean
}

export default function Suggestions({ sendMessage, messages, isOpen }: Props) {
  return (
    <Flex
      direction='column'
      align='flex-start'
      gap='4px'
      my='xs'
      pos='absolute'
      top='calc(-100% - 58px)'
      pb='20px'
      h='100%'
      w='100%'
      style={{
        opacity: isOpen ? 1 : 0,
        zIndex: isOpen ? 1 : -1,
      }}
    >
      {messages.map((message) => (
        <SuggestionButton key={message} onClick={() => sendMessage(message)}>
          {message}
        </SuggestionButton>
      ))}
    </Flex>
  )
}
