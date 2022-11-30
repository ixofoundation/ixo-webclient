import React, { useState } from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import styled from 'styled-components'
import FileLoader from 'common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'common/components/DropZone/types'
import { decode } from 'js-base64'
import { Container } from '../styles'
import { Input, Output } from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/bank'
import { BankMultiSendTrx } from 'common/utils'
import { useAccount } from 'redux/account/account.hooks'

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
  open: boolean
  setOpen: (open: boolean) => void
}

const MultiSendModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { signingClient, address } = useAccount()
  const [json, setJson] = useState<{ inputs: Input[]; outputs: Output[] }>()

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()

    if (!json) {
      return
    }
    await BankMultiSendTrx(signingClient, { address, inputs: json.inputs, outputs: json.outputs })
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Multi Send',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
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
    </ModalWrapper>
  )
}

export default MultiSendModal
