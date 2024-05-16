import { useState, KeyboardEvent } from 'react'
import { Textarea, Flex } from '@mantine/core'

import fetchInstantAssistantMessage from 'redux/assistant/thunks/fetchAssistantMessage'

import Suggestions from './Suggestions'
import ResetMessagesButton from './ResetMessagesButton'
import SendIcon from './SendIcon'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  selectAssistantIsThinking,
  selectAssistantMessages,
  selectIsUserSentMessages,
} from 'redux/assistant/assistant.selectors'
import { useTheme } from 'styled-components'

export default function QueryInput() {
  const dispatch = useAppDispatch()
  const theme: any = useTheme()
  const [typedMessage, setTypedMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const messages = useAppSelector(selectAssistantMessages)
  const isThinking = useAppSelector(selectAssistantIsThinking)
  const isUserSentMessages = useAppSelector(selectIsUserSentMessages)

  function sendMessage(message?: string) {
    dispatch(fetchInstantAssistantMessage(message || typedMessage))
    setTypedMessage('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  const isSuggestionsOpen = typedMessage === '' && isFocused && !isUserSentMessages && !isThinking

  return (
    <Flex
      align='center'
      justify='space-between'
      style={{
        border: `1px solid ${theme.ixoNewBlue}`,
        borderRadius: '16px',
      }}
      id='QueryInput'
      pos='relative'
    >
      {(messages.length || null) && <ResetMessagesButton />}
      <Suggestions
        messages={['What is Ixo?', 'Analyse my Asset Performance', 'Explain my Impact Certificate']}
        sendMessage={(m) => sendMessage(m)}
        isOpen={isSuggestionsOpen}
      />
      <Textarea
        placeholder={isThinking ? 'Please wait...' : 'Talk to your assistant'}
        autosize
        variant='unstyled'
        style={{ flexGrow: 1 }}
        p='10px'
        pr='0'
        value={typedMessage}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => {
          setTypedMessage(e.target.value)
        }}
      />
      <SendIcon sendMessage={() => sendMessage(typedMessage)} typedMessage={typedMessage} />
    </Flex>
  )
}
