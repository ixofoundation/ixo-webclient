import React, { useState } from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  ModalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
  ModalTitle,
  SelectionButton,
} from '../styles'
import { Button } from 'pages/CreateEntity/components'

interface Props {
  name?: string
  open: boolean
  options: string[]
  selectionType?: 'single' | 'multiple'
  onClose: () => void
  handleChange: (value: string[]) => void
}

const SelectionModal: React.FC<Props> = ({
  name = '',
  open,
  options,
  selectionType = 'single',
  onClose,
  handleChange,
}): JSX.Element => {
  const [selections, setSelections] = useState<string[]>([])

  const handleSelect = (value: string): void => {
    if (selectionType === 'single') {
      const found = selections.some((_) => _ === value)
      if (found) {
        setSelections([])
      } else {
        setSelections([value])
      }
    } else if (selectionType === 'multiple') {
      const found = selections.some((_) => _ === value)
      if (found) {
        setSelections((pre) => pre.filter((_) => _ !== value))
      } else {
        setSelections((pre) => [...pre, value])
      }
    }
  }

  return (
    <Modal
      style={ModalStyles}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Select {name}:</ModalTitle>
        <ModalBody>
          {_.chunk(options, 3).map((row, rowIdx) => (
            <ModalRow
              key={rowIdx}
              style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
            >
              {row.map((value) => (
                <SelectionButton
                  key={value}
                  selected={selections.some((_) => _ === value)}
                  onClick={(): void => {
                    handleSelect(value)
                  }}
                >
                  {value}
                </SelectionButton>
              ))}
            </ModalRow>
          ))}
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={(): void => {
                handleChange(selections)
                onClose()
              }}
            >
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default SelectionModal
