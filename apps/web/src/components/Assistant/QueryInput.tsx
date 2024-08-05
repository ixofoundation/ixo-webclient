import { useState } from 'react'
import { Textarea, Flex } from '@mantine/core'

import Suggestions from './Suggestions'
import SendIcon from './SendIcon'
import { useAppSelector } from 'redux/hooks'
import {
  selectAssistantIsThinking,
  selectAssistantMessages,
  selectIsUserSentMessages,
} from 'redux/assistant/assistant.selectors'
import { useMantineTheme } from '@mantine/core'

export default function QueryInput({ sendMessage }: { sendMessage: (message: string) => void }) {
  const theme = useMantineTheme()
  const [typedMessage, setTypedMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const messages = useAppSelector(selectAssistantMessages)
  const isThinking = useAppSelector(selectAssistantIsThinking)
  const isUserSentMessages = useAppSelector(selectIsUserSentMessages)

  // function sendMessage(message?: string) {
  //   dispatch(fetchInstantAssistantMessage(message || typedMessage))
  //   setTypedMessage('')
  // }

  // function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault()
  //     sendMessage(typedMessage)
  //   }
  // }

  const isSuggestionsOpen = typedMessage === '' && isFocused && !isUserSentMessages && !isThinking

  return (
    <Flex
      align='center'
      justify='space-between'
      style={{
        border: `1px solid ${theme.colors.blue[5]}`,
        borderRadius: '16px',
      }}
      id='QueryInput'
      pos='relative'
    >
      <Suggestions
        messages={['What is Ixo?', 'Analyse my Asset Performance', 'Explain my Impact Certificate']}
        sendMessage={(m: string) => sendMessage(m)}
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
        // onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => {
          setTypedMessage(e.target.value)
        }}
      />
      <SendIcon sendMessage={() => sendMessage(typedMessage)} typedMessage={typedMessage} />
    </Flex>
  )
}
