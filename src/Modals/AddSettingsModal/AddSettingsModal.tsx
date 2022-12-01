import React from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'Modals/styles'
import { PropertyBox } from 'pages/CreateEntity/CreateAsset/pages/SetupProperties/SetupProperties.styles'
import { theme, Typography } from 'components/App/App.styles'

interface Props {
  settings: { [key: string]: any }
  open: boolean
  onClose: () => void
  handleChange: (key: string) => void
}

const AddSettingsModal: React.FC<Props> = ({ settings, open, onClose, handleChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Add a Setting</ModalTitle>
        <ModalBody>
          {_.chunk(Object.entries(settings), 4).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  bgColor={value.required ? theme.ixoLightGrey2 : theme.ixoMediumGrey}
                  onClick={(): void => {
                    handleChange(key)
                    onClose()
                  }}
                >
                  <value.icon />
                  <Typography fontWeight={700} fontSize='16px' lineHeight='19px' color={theme.ixoWhite}>
                    {value.text}
                  </Typography>
                </PropertyBox>
              ))}
            </ModalRow>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default AddSettingsModal
