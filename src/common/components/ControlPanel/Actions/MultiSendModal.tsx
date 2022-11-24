import React, { useState } from 'react'
import styled from 'styled-components'
import FileLoader from 'common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'common/components/DropZone/types'
import { decode } from 'js-base64'
import { broadCastMessage } from 'common/utils/keysafe'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { MsgMultiSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx'
// import { Input, Output } from 'cosmjs-types/cosmos/bank/v1beta1/bank'
import * as keplr from 'common/utils/keplr'
import { Container } from './Modal.styles'

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid #00d2ff;
    border-radius: 0.25rem;
    height: 2.25rem;
    width: 6.5rem;
    background: transparent;
    color: white;
    outline: none;
  }
`

interface Props {
  walletType: string
}

const MultiSendModal: React.FunctionComponent<Props> = ({ walletType }) => {
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const [json, setJson] = useState<any>(null)
  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()
    if (!json) {
      return
    }

    switch (walletType) {
      case 'keysafe':
        {
          const msgs = [
            {
              type: 'cosmos-sdk/MsgMultiSend',
              value: json,
            },
          ]
          const fee = {
            amount: [{ amount: String(5000), denom: 'uixo' }],
            gas: String(200000),
          }
          const memo = ''

          broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msgs, memo, fee, () => {
            console.log('handleMultiSend')
          })
        }
        break
      case 'keplr':
        {
          const msgs = [
            {
              typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
              value: MsgMultiSend.fromPartial({
                inputs: json.inputs,
                outputs: json.outputs,
              }),
            },
          ]
          const fee = {
            amount: [{ amount: String(5000), denom: 'uixo' }],
            gas: String(200000),
          }
          const memo = ''

          const [accounts, offlineSigner] = await keplr.connectAccount()
          const address = accounts[0].address
          const client = await keplr.initStargateClient(offlineSigner)

          const payload = {
            msgs,
            chain_id: process.env.REACT_APP_CHAIN_ID,
            fee,
            memo,
          }

          try {
            const result = await keplr.sendTransaction(client, address, payload)
            if (result) {
              console.log('success')
            } else {
              // eslint-disable-next-line
              throw 'transaction failed'
            }
          } catch (e) {
            console.log(e)
          }
        }
        break
      default:
        break
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FileLoader
          maxFileSize={5000000}
          fileType={FileType.Document}
          uploadedFileSrc={null!}
          uploading={false}
          handleSave={(base64EncodedFile): void => {
            try {
              setJson(JSON.parse(decode(base64EncodedFile!.slice(29))))
            } catch (e) {
              console.log('File save error', e)
            }
          }}
        />
        <ButtonContainer>
          <button type='submit'>Send</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default MultiSendModal
