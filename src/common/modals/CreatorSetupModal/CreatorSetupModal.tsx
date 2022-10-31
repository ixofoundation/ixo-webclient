import React from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  modalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
} from './CreatorSetupModal.styles'
import { theme, Typography } from 'modules/App/App.styles'
import { TEntityCreatorModel } from 'types'

interface Props {
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  handleChange: (creator) => void
}

const CreatorSetupModal: React.FC<Props> = ({
  creator,
  open,
  onClose,
  handleChange,
}): JSX.Element => {
  return (
    <Modal
      style={modalStyles}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <Typography
          color={theme.ixoBlack}
          fontWeight={400}
          fontSize={'20px'}
          lineHeight={'28px'}
          style={{ marginBottom: 10 }}
        >
          Creator
        </Typography>
        <ModalBody></ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default CreatorSetupModal
