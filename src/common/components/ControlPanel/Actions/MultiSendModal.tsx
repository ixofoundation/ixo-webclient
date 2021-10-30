import React, { useState } from 'react'
import styled from 'styled-components'
import FileLoader from 'common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'common/components/DropZone/types'
import { decode } from 'js-base64'
import { broadCastMessage } from 'common/utils/keysafe'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'

const Container = styled.div`
  padding: 1rem 1rem;
  min-width: 32rem;
`

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

  const [json, setJson] = useState(null)
  const handleSubmit = (event): void => {
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

          broadCastMessage(
            userInfo,
            userSequence,
            userAccountNumber,
            msgs,
            memo,
            fee,
            () => {
              console.log('handleMultiSend')
            },
          )
        }
        break
      case 'keplr':
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
          uploadedFileSrc={null}
          uploading={false}
          handleSave={(base64EncodedFile): void => {
            try {
              setJson(JSON.parse(decode(base64EncodedFile.slice(29))))
            } catch (e) {
              console.log('fffffffff', e)
            }
          }}
        />
        <ButtonContainer>
          <button type="submit">Send</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default MultiSendModal
