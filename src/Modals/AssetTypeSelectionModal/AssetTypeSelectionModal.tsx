import React from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'Modals/styles'
import { TypeButton } from './AssetTypeSelectionModal.styles'
import { EAssetType } from 'types'

interface Props {
  open: boolean
  onClose: () => void
  handleChange: (type: EAssetType) => void
}

const AssetTypeSelectionModal: React.FC<Props> = ({ open, onClose, handleChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Select the Asset Type</ModalTitle>
        <ModalBody>
          {_.chunk(Object.entries(EAssetType), 3).map((row, rowIdx) => (
            <ModalRow key={rowIdx}>
              {row.map(([key, value]) => (
                <TypeButton
                  key={value}
                  onClick={(): void => {
                    handleChange(key as EAssetType)
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
