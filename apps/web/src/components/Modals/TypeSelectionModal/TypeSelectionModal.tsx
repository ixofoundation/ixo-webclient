import React from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'

import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { TypeButton } from './TypeSelectionModal.styles'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  options: string[]
  handleChange: (option: string) => void
}

const TypeSelectionModal: React.FC<Props> = ({ open, onClose, title, options, handleChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody style={{ gap: 8 }}>
          {_.chunk(options, 3).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ gap: 16 }}>
              {row.map((option) => (
                <TypeButton
                  key={option}
                  onClick={(): void => {
                    handleChange(option)
                    onClose()
                  }}
                >
                  {option}
                </TypeButton>
              ))}
            </ModalRow>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default TypeSelectionModal
