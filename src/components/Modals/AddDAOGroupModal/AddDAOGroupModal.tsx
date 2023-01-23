import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { DAOGroupConfig } from 'types/protocol'
import { Typography } from 'components/Typography'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (key: string) => void
}

const AddDAOGroupModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    setSelectedItem('')
  }, [open])

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Select how this group will be governed</ModalTitle>
        <ModalBody>
          {selectedItem && (
            <ModalRow>
              <Typography size='md' style={{ width: 0, flexGrow: 1 }}>
                {DAOGroupConfig[selectedItem].description}
              </Typography>
            </ModalRow>
          )}
          {_.chunk(Object.entries(DAOGroupConfig), 4).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  icon={<value.icon />}
                  label={value.text}
                  required
                  hovered={key === selectedItem}
                  handleClick={(): void => setSelectedItem(key)}
                />
              ))}
            </ModalRow>
          ))}
          <ModalRow>
            <Button
              onClick={(): void => {
                onAdd(selectedItem)
                onClose()
              }}
              disabled={!selectedItem}
              style={{ width: '100%' }}
            >
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default AddDAOGroupModal
