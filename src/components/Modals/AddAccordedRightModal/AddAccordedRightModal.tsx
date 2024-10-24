import React from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'

import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { PropertyBox } from 'screens/CreateEntity/Components'
import { EntityAccordedRightConfig } from 'constants/entity'

interface Props {
  open: boolean
  onClose: () => void
  handleChange: (key: string) => void
}

const AddAccordedRightModal: React.FC<Props> = ({ open, onClose, handleChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Add an Accorded Right</ModalTitle>
        <ModalBody>
          {_.chunk(Object.entries(EntityAccordedRightConfig), 4).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  icon={<img src={value.icon} alt='replaced' />}
                  label={value.text}
                  handleClick={(): void => {
                    handleChange(key)
                    onClose()
                  }}
                />
              ))}
            </ModalRow>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default AddAccordedRightModal
