import { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { CloseButton, ModalBody, ModalRow, ModalStyles, ModalTitle, ModalWrapper } from '../styles'
import ConfigureAlphaBondCard from './ConfigureAlphaBondCard'
import { AlphaBondInfo } from 'types/bond'

interface Props {
  open: boolean
  onClose: () => void
}

const CreateBondModal: React.FC<Props> = ({ open, onClose }): JSX.Element => {
  const [alphaBondInfo, setAlphaBondInfo] = useState<AlphaBondInfo | undefined>(undefined)

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>{'Configure an AlphaBond'}</ModalTitle>
        <ModalBody style={{ width: 1000 }}>
          <ModalRow>
            <ConfigureAlphaBondCard
              formData={alphaBondInfo}
              handleUpdateContent={(formData: any): void => {
                setAlphaBondInfo({
                  ...formData,
                  token: formData.token ? formData.token.toUpperCase() : '',
                })
              }}
              handleSubmitted={(): void => {
                console.log('handleSubmitted')
              }}
              handleError={(errors): void => {
                console.log('handleError', errors)
              }}
            />
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default CreateBondModal
