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
import * as base58 from 'bs58'

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
  userAccountNumber?: string
  userSequence?: string
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
  userAccountNumber,
  userSequence,
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
          const pubKey = base58
            .decode(userInfo.didDoc.pubKey)
            .toString('base64')

          const payload = {
            msgs: [
              {
                type: 'cosmos-sdk/MsgSend',
                value: {
                  amount: [
                    {
                      amount: String(1), // 6 decimal places (1000000 uixo = 1 IXO)
                      denom: 'uixo',
                    },
                  ],
                  from_address: userAddress,
                  to_address: 'ixo1x70tkjl6kqy92h2d0rshhpga3a5m672wx59l9n',
                },
              },
            ],
            chain_id: process.env.REACT_APP_CHAIN_ID,
            fee: {
              amount: [{ amount: String(5000), denom: 'uixo' }],
              gas: String(200000),
            },
            memo: '',
            account_number: userAccountNumber,
            sequence: userSequence,
          }

          keysafe.requestSigning(
            JSON.stringify(payload),
            (error: any, signature: any) => {
              if (error) {
                return
              }

              Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
                tx: {
                  msg: payload.msgs,
                  fee: payload.fee,
                  signatures: [
                    {
                      account_number: payload.account_number,
                      sequence: payload.sequence,
                      signature: signature.signatureValue,
                      pub_key: {
                        type: 'tendermint/PubKeyEd25519',
                        value: pubKey,
                      },
                    },
                  ],
                  memo: '',
                },
                mode: 'sync',
              }).then((response) => console.log('fffffffffff', response))
            },
            'base64',
          )

          Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
            tx: {
              msg: [
                {
                  type: 'cosmos-sdk/MsgSend',
                  value: {
                    amount: [{ amount: '1', denom: 'uixo' }],
                    from_address: 'ixo107pmtx9wyndup8f9lgj6d7dnfq5kuf3sapg0vx',
                    to_address: 'ixo1ermullz56t0t4dj3nwavlr54avsvtx9r39e9ng',
                  },
                },
              ],
              fee: {
                amount: [{ amount: '5000', denom: 'uixo' }],
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
  userAccountNumber: accountSelectors.selectUserAccountNumber(state),
  userSequence: accountSelectors.selectUserSequence(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (
    email: string,
    name: string,
    role: AgentRole,
  ): void => dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
