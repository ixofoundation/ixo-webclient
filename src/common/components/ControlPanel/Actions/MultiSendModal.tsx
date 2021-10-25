import React, { useState } from 'react'
import styled from 'styled-components'
import FileLoader from 'common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'common/components/DropZone/types'
import { decode } from 'js-base64'
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
  handleMultiSend: (json: any) => void
}

const SendModal: React.FunctionComponent<Props> = ({ handleMultiSend }) => {
  const [json, setJson] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()

    if (json) {
      handleMultiSend(json)
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

export default SendModal
