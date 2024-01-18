import { useEffect, useRef } from 'react'
import { Flex, ScrollArea } from '@mantine/core'

import {
  selectAssistantMessages,
  selectAssistantIsThinking,
  selectAssistantError,
} from 'redux/assistant/assistant.selectors'

import { UserMessage, AssistantMessage, AssistantThinkingMessage, AssistantErrorMessage } from './Messages'
import { useAppSelector } from 'redux/hooks'

export default function Conversation() {
  const viewport = useRef<HTMLDivElement>(null)
  const messages = useAppSelector(selectAssistantMessages)
  const isThinking = useAppSelector(selectAssistantIsThinking)
  const assistantError = useAppSelector(selectAssistantError)

  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    })

  useEffect(() => {
    scrollToBottom()
  }, [isThinking])

  return (
    <ScrollArea viewportRef={viewport} p={0} h='100%' mah='450px'>
      <Flex id='Container' direction='column' justify='flex-end' sx={{ flexGrow: 1 }} pt={0} mih='450px'>
        {messages.map((message) => {
          if (message.role === 'user') return <UserMessage message={message.content} key={message.content} />
          if (message.role === 'assistant') return <AssistantMessage message={message.content} key={message.content} />
          return null
        })}
        {assistantError && <AssistantErrorMessage error={assistantError} />}
        {isThinking && <AssistantThinkingMessage />}
      </Flex>
    </ScrollArea>
  )
}
