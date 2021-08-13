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
import Axios from 'axios'
import keysafe from 'common/keysafe/keysafe'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { encode } from 'js-base64'

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
  userAddress?: string
  params: any
  handleCreateEntityAgent?: (
    email: string,
    name: string,
    role: AgentRole,
  ) => void
}

const Assistant: React.FunctionComponent<AssistantProps> = ({
  initMsg,
  params,
  userInfo,
  userAddress,
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
      console.log('ggggggggggggggggg', msg)
      if (
        msg.direction === 'in' &&
        !msg.text &&
        !msg.quick_replies &&
        !msg.buttons
      ) {
        switch (msg.action) {
          case 'authorise':
            if (userInfo) {
              handleCreateEntityAgent(msg.emai, msg.name, params.role)
            }
            break
        }

        if (msg.amount) {
          const pubKey = userInfo.didDoc.pubKey
          const msgType = 'cosmos-sdk/MsgSend'

          const tx = {
            amount: [
              {
                amount: '1',
                denom: 'uixo',
              },
            ],
            from_address: userAddress,
            to_address: 'ixo1ermullz56t0t4dj3nwavlr54avsvtx9r39e9ng',
          }

          const msgJson = JSON.stringify({ type: msgType, value: tx })
          const arr = []
          arr.push(msgJson)
          const postFormat = { msg: arr, pub_key: pubKey }

          Axios.post('https://testnet.ixo.world/txs/sign_data', postFormat)
          blocksyncApi.utils
            .getSignData(tx, msgType, pubKey)
            .then((response: any) => {
              console.log('hhhhhhhhhhhhhhhhhh', response)
            })
          keysafe.requestSigning(
            {
              account_number: '3',
              sequence: '32',
            },
            (error: any, signature: any) => {
              if (!error) {
                console.log('ffffffffffffff', signature)
              }

              console.log('ffffffffffffff', error)
            },
            'base64',
          )
          Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
            tx: {
              msg: [
                {
                  type: 'cosmos-sdk/MsgSend',
                  value: {
                    amount: [
                      {
                        amount: '1',
                        denom: 'uixo',
                      },
                    ],
                    from_address: userAddress,
                    to_address: 'ixo1ermullz56t0t4dj3nwavlr54avsvtx9r39e9ng',
                  },
                },
              ],
              fee: {
                amount: [
                  {
                    amount: '5000',
                    denom: 'uixo',
                  },
                ],
                gas: '200000',
              },
              signatures: [
                {
                  account_number: '3',
                  sequence: '32',
                  signature:
                    '7zc2kwFGzN9irBO4QsHSiF+YjW2ECoA/inzOWMrU+9XVfXb7aSJUs+CnH9D2sIJLUVxpG1gcr02xisSjifmvBA==',
                  pub_key: {
                    type: 'tendermint/PubKeyEd25519',
                    value: 'HIZo126KQUXbBHVt+ByuPfxxDSZwxMNZlw6fcYbfq7E=',
                  },
                },
              ],
              memo: '',
            },
            mode: 'sync',
          }).then((response) => console.log('fffffffffff', response))
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
  userAddress: accountSelectors.selectUserAddress(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (
    email: string,
    name: string,
    role: AgentRole,
  ): void => dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
