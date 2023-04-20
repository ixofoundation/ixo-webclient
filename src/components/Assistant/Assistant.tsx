import React, { FormEvent, useRef, useEffect, Dispatch, useState, useCallback } from 'react'
// @ts-ignore
import useBot from 'react-rasa-assistant'
import ArrowUp from 'assets/icons/ArrowUp'
import { createEntityAgent } from 'redux/selectedEntityAgents/entityAgents.actions'
import { connect } from 'react-redux'
import { AgentRole, UserInfo } from 'redux/account/account.types'
import { RootState } from 'redux/store'
import * as accountSelectors from 'redux/account/account.selectors'
import TextareaAutosize from 'react-textarea-autosize'
import Axios from 'axios'
import * as base58 from 'bs58'
import * as Toast from 'utils/toast'

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
  handleCreateEntityAgent?: (email: string, name: string, role: AgentRole) => void
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
  const messagesRef = useRef<HTMLInputElement>(null)
  const fundAccount = useCallback((walletAddress, pubKey, amount) => {
    const payload = {
      account_number: userAccountNumber,
      chain_id: process.env.REACT_APP_CHAIN_ID,
      fee: {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            amount: [
              {
                amount: String(`${amount}000000`), // 6 decimal places (1000000 uixo = 1 IXO)
                denom: 'uixo',
              },
            ],
            from_address: userAddress,
            to_address: walletAddress,
          },
        },
      ],
      sequence: userSequence,
    }

    console.log({ payload })

    // keysafe.requestSigning(
    //   JSON.stringify(payload),
    //   (error: any, signature: any) => {
    //     if (error) {
    //       return
    //     }

    //     Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
    //       tx: {
    //         msg: payload.msgs,
    //         fee: payload.fee,
    //         signatures: [
    //           {
    //             account_number: payload.account_number,
    //             sequence: payload.sequence,
    //             signature: signature.signatureValue,
    //             pub_key: {
    //               type: 'tendermint/PubKeyEd25519',
    //               value: pubKey,
    //             },
    //           },
    //         ],
    //         memo: '',
    //       },
    //       mode: 'sync',
    //     }).then((response) => {
    //       if (response.data.txhash) {
    //         Toast.successToast(`Transaction Successful`)
    //         return
    //       }

    //       Toast.errorToast(`Transaction Failed`)
    //     })
    //   },
    //   'base64',
    // )
    // eslint-disable-next-line
  }, [])

  const { msgHistory, userText, setUserText, sendUserText, selectOption } = useBot({
    sockUrl: process.env.REACT_APP_ASSISTANT_URL + '/socket.io/',
    onUtter: (msg: any) => {
      if (msg.direction === 'in' && !msg.text && !msg.quick_replies && !msg.buttons) {
        switch (msg.action) {
          case 'authorise':
            if (userInfo && handleCreateEntityAgent) {
              handleCreateEntityAgent(msg.email, msg.name, params.role)
            }
            break
        }

        if (msg.amount) {
          if (userInfo) {
            // @ts-ignore
            const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')

            if (msg.to_address.includes('did:')) {
              Axios.get(`${process.env.REACT_APP_GAIA_URL}/projectAccounts/${msg.to_address}`).then((response) => {
                if (response.data['map']) {
                  fundAccount(response.data['map'][msg.to_address], pubKey, msg.amount)
                }

                Axios.get(`${process.env.REACT_APP_GAIA_URL}/didToAddr/${msg.to_address}`).then((response) => {
                  if (response.data.result) {
                    fundAccount(response.data.result, pubKey, msg.amount)
                    return
                  }

                  Toast.errorToast(`Invalid account id or wallet address`)
                })
              })
            } else {
              fundAccount(msg.to_address, pubKey, msg.amount)
            }
          }
        }
      }
    },
    initMsg: {
      title: '',
      payload: initMsg,
    },
  })

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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
    messagesRef.current?.scrollTo({
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
  const displayTypingIndicator = msgHistory[msgHistory.length - 1]?.direction === 'out'

  return (
    <Container>
      <MessagesContainer ref={messagesRef}>
        {msgHistory.map((msg: any, msgIdx: any) => {
          if (msg.quick_replies || msg.buttons) {
            return (
              <ActionButtonContainer key={msg.ts + '-btngroup'}>
                {(msg.quick_replies || msg.buttons).map((opt: any, optIdx: any) => (
                  <ActionButton key={opt.payload} onClick={(): void => selectOption(msgIdx, optIdx)}>
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
                <span className='dot' />
                <span className='dot' />
                <span className='dot' />
              </TypingIndicator>
            </MessageIn>
          </MessageWrapper>
        )}
      </MessagesContainer>
      {renderTextarea && (
        <StyledForm onSubmit={handleSubmit}>
          <TextareaAutosize
            name='message'
            placeholder='Type a message...'
            autoComplete='off'
            onKeyDown={handleKeydown}
            onChange={(event): void => setUserText(event.target.value)}
            value={userText}
          />
          <SendButton type='submit' disabled={!userText.length}>
            <ArrowUp />
          </SendButton>
        </StyledForm>
      )}
    </Container>
  )
}

const mapStateToProps = (state: RootState): any => ({
  userInfo: accountSelectors.selectUserInfo(state),
  userAddress: accountSelectors.selectAccountAddress(state),
  userAccountNumber: accountSelectors.selectUserAccountNumber(state),
  userSequence: accountSelectors.selectUserSequence(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntityAgent: (email: string, name: string, role: AgentRole): void =>
    dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Assistant)
