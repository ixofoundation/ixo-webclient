import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { AccountValidStatus, Button, InputWithLabel, PropertyBox } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { FlexBox } from 'components/App/App.styles'
import { isAccountAddress } from 'utils/validation'
import { DAOGroupConfig } from 'constants/entity'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (key: string) => void
  onClone: (address: string) => void
}

const AddDAOGroupModal: React.FC<Props> = ({ open, onClose, onAdd, onClone }): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState('')
  const [existingAddress, setExistingAddress] = useState('')
  const isValidAddress: boolean = isAccountAddress(existingAddress)

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
        <ModalTitle>
          {selectedItem === 'new' ? 'Add existing group' : 'Select how this group will be governed'}
        </ModalTitle>
        <ModalBody>
          {selectedItem && (
            <ModalRow>
              {selectedItem === 'new' ? (
                <FlexBox $direction='column' $gap={4} style={{ width: 0, flexGrow: 1 }}>
                  <Typography size='md'>{DAOGroupConfig[selectedItem].description}</Typography>
                  <FlexBox $gap={4} width='100%'>
                    <InputWithLabel
                      height='48px'
                      label='Enter ixo Address'
                      inputValue={existingAddress}
                      handleChange={setExistingAddress}
                      wrapperStyle={{ flex: 1 }}
                    />
                    <AccountValidStatus address={existingAddress} />
                  </FlexBox>
                </FlexBox>
              ) : (
                <Typography size='md' style={{ width: 0, flexGrow: 1 }}>
                  {DAOGroupConfig[selectedItem].description}
                </Typography>
              )}
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
                if (selectedItem === 'new') {
                  onClone(existingAddress)
                } else {
                  onAdd(selectedItem)
                }
                onClose()
              }}
              disabled={(selectedItem === 'new' && !isValidAddress) || !selectedItem}
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
