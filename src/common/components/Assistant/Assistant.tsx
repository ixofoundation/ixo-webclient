import React, { ChangeEvent, FormEvent } from 'react'
import styled, { keyframes } from 'styled-components'
import useBot from 'react-rasa-assistant'

interface Props {
  onMessageReceive: (text: any) => void
  customComponent?: (messageData: any) => JSX.Element
  initPayload?: string
}

const Wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }

  30% {
    transform: translateY(-5px);
  }
`

const TypingIndicator = styled.div`
  position: relative;
  text-align: center;
  width: 25px;
  height: 13px;
  margin-left: auto;
  margin-right: auto;
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 3px;
    background: #939393;
    animation: ${Wave} 1.6s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.4s;
    }

    &:nth-child(3) {
      animation-delay: -1.2s;
    }
  }
`

const ActionButton = styled.button`
  background: transparent;
  border-color: #135afe;
  border-radius: 15px;
  color: #135afe;
  margin-right: 5px;
  margin-bottom: 9px;
`

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
    <div className="rw-conversation-container">
      <div id="rw-messages" className="rw-messages-container">
        {msgHistory.map((msg, msgIdx) => {
          if (msg.quick_replies || msg.buttons) {
            return (
              <div key={msg.ts + '-btngroup'}>
                {(msg.quick_replies || msg.buttons).map((opt, optIdx) => (
                  <ActionButton
                    key={opt.payload}
                    onClick={() => selectOption(msgIdx, optIdx)}
                  >
                    {opt.title}
                  </ActionButton>
                ))}
              </div>
            )
          }

          if (msg.text.length === 0) {
            return null
          }

          if (msg.direction === 'out') {
            return (
              <div className="rw-message" key={msg.ts + '-txt'}>
                <div className="rw-client">
                  <div className="rw-message-text">{msg.text}</div>
                </div>
              </div>
            )
          }

          return (
            <div className="rw-message" key={msg.ts + '-txt'}>
              <div className="rw-response">
                <div className="rw-message-text">
                  <div className="rw-markdown">{msg.text}</div>
                </div>
              </div>
            </div>
          )
        })}

        {displayTypingIndicator && (
          <div className="rw-message">
            <div className="rw-response">
              <TypingIndicator>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </TypingIndicator>
            </div>
          </div>
        )}
      </div>
      <form className="rw-sender" onSubmit={handleSubmit}>
        <input
          type="text"
          className="rw-new-message"
          name="message"
          placeholder="Type a message..."
          autoComplete="off"
          onChange={handleUserInput}
          value={userText}
        />
        <button type="submit" className="rw-send" disabled={!userText.length}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            enableBackground="new 0 0 535.5 535.5"
            version="1.1"
            viewBox="0 0 535.5 535.5"
          >
            <path
              className="rw-send-icon-ready"
              d="M0 497.25L535.5 267.75 0 38.25 0 216.75 382.5 267.75 0 318.75z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Assistant
