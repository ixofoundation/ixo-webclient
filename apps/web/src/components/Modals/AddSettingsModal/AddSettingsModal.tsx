import Image from 'next/image'
import React from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { PropertyBox } from 'screens/CreateEntity/Components'
import { EntitySettingsConfig } from 'constants/entity'
import { IconClose } from 'components/IconPaths'


interface Props {
  open: boolean
  addedKeys: string[]
  onClose: () => void
  onChange: (key: string) => void
}

const AddSettingsModal: React.FC<Props> = ({ open, addedKeys, onClose, onChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Add a Setting</ModalTitle>
        <ModalBody>
          {_.chunk(Object.entries(EntitySettingsConfig), 4).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  icon={<value.icon />}
                  label={value.text}
                  required={!value.required}
                  handleClick={(): void => {
                    onChange(key)
                    onClose()
                  }}
                  disabled={addedKeys.includes(key)}
                />
              ))}
            </ModalRow>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default AddSettingsModal
