import React from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { EntityLinkedResourceConfig } from 'constants/entity'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (type: string) => void
}

const AddLinkedResourceModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Add a Linked Resource</ModalTitle>
        <ModalBody>
          {_.chunk(
            Object.entries(EntityLinkedResourceConfig).filter(([, value]) => !value.required),
            4,
          ).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  icon={<value.icon />}
                  label={value.text}
                  disabled={value.disabled}
                  handleClick={(): void => {
                    onAdd(key)
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

export default AddLinkedResourceModal
