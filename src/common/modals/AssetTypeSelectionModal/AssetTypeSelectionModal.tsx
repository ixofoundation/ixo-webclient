import React from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  modalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
  TypeButton,
} from './AssetTypeSelectionModal.styles'
import { theme, Typography } from 'modules/App/App.styles'
import { AssetTypes } from './types'

interface Props {
  open: boolean
  onClose: () => void
  handleChange: (type: AssetTypes) => void
}

const AssetTypeSelectionModal: React.FC<Props> = ({
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
          Select the Asset Type
        </Typography>
        <ModalBody>
          {_.chunk(Object.entries(AssetTypes), 3).map((row, rowIdx) => (
            <ModalRow key={rowIdx}>
              {row.map(([key, value]) => (
                <TypeButton
                  key={value}
                  onClick={(): void => {
                    handleChange(key as AssetTypes)
                    onClose()
                  }}
                >
                  {value}
                </TypeButton>
              ))}
            </ModalRow>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default AssetTypeSelectionModal
