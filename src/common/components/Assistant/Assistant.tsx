import React, { FormEvent, useRef, useEffect, Dispatch, useState } from 'react'
import useBot from 'react-rasa-assistant'
import ArrowUp from 'assets/icons/ArrowUp'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { connect } from 'react-redux'
import { AgentRole } from 'modules/Account/types'
import { RootState } from 'common/redux/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { UserInfo } from 'modules/Account/types'
import TextareaAutosize from 'react-textarea-autosize'

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
} from './Assistant.styles'

interface AssistantProps {
  initMsg: string
  userInfo?: UserInfo
  role?: AgentRole
  handleCreateEntityAgent?: (
    email: string,
    name: string,
    role: AgentRole,
  ) => void
}

const Assistant: React.FunctionComponent<AssistantProps> = ({
  initMsg,
  userInfo,
  role,
  handleCreateEntityAgent,
}) => {
  const messagesRef = useRef(null)

  const {
    msgHistory,
    userText,
    setUserText,
    sendUserText,
    selectOption,
  } = useBot({
    sockUrl: process.env.REACT_APP_ASSISTANT_URL + '/socket.io/',
    onUtter: (msg) => {
      if (
        msg.direction === 'in' &&
        !msg.text &&
        !msg.quick_replies &&
        !msg.buttons
      ) {
        switch (msg.action) {
          case 'authorise':
            if (userInfo) {
              handleCreateEntityAgent(msg.emai, msg.name, role)
            }
            break
        }
      }
    },
    initMsg: {
      title: '',
      payload: initMsg,
    },
  })

  const handleKeydown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault()
      sendUserText()
      setUserText('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    sendUserText()
  }

  useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    })
  })

  const [renderTextarea, SetRenderTextarea] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      SetRenderTextarea(true)
    }, 1500)
  }, [])

  // sent msg but have not received response, show typing indicator
  const displayTypingIndicator =
    msgHistory[msgHistory.length - 1]?.direction === 'out'

  return (
    <Container>
      <MessagesContainer ref={messagesRef}>
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
      {renderTextarea && (
        <StyledForm onSubmit={handleSubmit}>
          <TextareaAutosize
            name="message"
            placeholder="Type a message..."
            autoComplete="off"
            onKeyDown={handleKeydown}
            onChange={(event): void => setUserText(event.target.value)}
            value={userText}
          />
          <SendButton type="submit" disabled={!userText.length}>
            <ArrowUp />
          </SendButton>
        </StyledForm>
      )}
    </Container>
  )
}

const mapStateToProps = (state: RootState): any => ({
  userInfo: accountSelectors.selectUserInfo(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (
    email: string,
    name: string,
    role: AgentRole,
  ): void => dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
