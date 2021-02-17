import React, { ChangeEvent, FormEvent } from 'react'
import useBot from 'react-rasa-assistant'
import ArrowUp from 'assets/icons/ArrowUp'

import {
  Container,
  MessageWrapper,
  TypingIndicator,
  ActionButtonContainer,
  ActionButton,
  SendButton,
  StyledForm,
  MessageIn,
  MessageOut,
  MessagesContainer,
  StyledInput,
} from './Assistant.styles'

interface Props {
  onMessageReceive: (text: any) => void
  customComponent?: (messageData: any) => JSX.Element
  initPayload?: string
}

interface AssistantProps {
  initMsg: string
}

const Assistant: React.FunctionComponent<AssistantProps> = ({ initMsg }) => {
  const {
    msgHistory,
    userText,
    setUserText,
    sendUserText,
    selectOption,
    botUtter,
  } = useBot({
    sockUrl: process.env.REACT_APP_ASSISTANT_URL + '/socket.io/',
    onUtter: (msg) => {
      if (
        msg.direction === 'in' &&
        !msg.text &&
        !msg.quick_replies &&
        !msg.buttons
      ) {
        console.log('This is a custom message!', msg)

        botUtter({ text: 'I just sent you a custom message!' })
      }
    },
    initMsg: {
      title: '',
      payload: initMsg,
    },
  })

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserText(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    sendUserText()
  }

  // sent msg but have not received response, show typing indicator
  const displayTypingIndicator =
    msgHistory[msgHistory.length - 1]?.direction === 'out'

  return (
    <Container>
      <MessagesContainer>
        {msgHistory.map((msg, msgIdx) => {
          if (msg.quick_replies || msg.buttons) {
            return (
              <ActionButtonContainer key={msg.ts + '-btngroup'}>
                {(msg.quick_replies || msg.buttons).map((opt, optIdx) => (
                  <ActionButton
                    key={opt.payload}
                    onClick={(): void => selectOption(msgIdx, optIdx)}
                  >
                    {opt.title}
                  </ActionButton>
                ))}
              </ActionButtonContainer>
            )
          }

          if (!msg.text) {
            return null
          }

          if (msg.direction === 'out') {
            return (
              <MessageWrapper key={msg.ts + '-txt'}>
                <MessageOut>{msg.text}</MessageOut>
              </MessageWrapper>
            )
          }

          return (
            <MessageWrapper key={msg.ts + '-txt'}>
              <MessageIn>{msg.text}</MessageIn>
            </MessageWrapper>
          )
        })}

        {displayTypingIndicator && (
          <MessageWrapper>
            <MessageIn>
              <TypingIndicator>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </TypingIndicator>
            </MessageIn>
          </MessageWrapper>
        )}
      </MessagesContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="message"
          placeholder="Type a message..."
          autoComplete="off"
          onChange={handleUserInput}
          value={userText}
        />
        <SendButton type="submit" disabled={!userText.length}>
          <ArrowUp />
        </SendButton>
      </StyledForm>
    </Container>
  )
}

export default Assistant
