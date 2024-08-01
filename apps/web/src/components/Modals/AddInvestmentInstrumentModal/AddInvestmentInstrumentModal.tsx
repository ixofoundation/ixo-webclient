import React from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { InvestmentInstrumentsConfig } from 'constants/entity'

interface Props {
  open: boolean
  onClose: () => void
  handleChange: (key: string) => void
}

const AddInvestmentInstrumentModal: React.FC<Props> = ({ open, onClose, handleChange }): JSX.Element => {
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Select an Investment Instrument</ModalTitle>
        <ModalBody>
          {_.chunk(Object.entries(InvestmentInstrumentsConfig), 4).map((row, rowIdx) => (
            <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
              {row.map(([key, value]) => (
                <PropertyBox
                  key={key}
                  icon={<value.icon />}
                  label={value.text}
                  disabled={value.disabled}
                  required={!value.required}
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

export default AddInvestmentInstrumentModal
