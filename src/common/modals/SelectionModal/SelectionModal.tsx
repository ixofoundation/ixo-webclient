import React, { useEffect, useState } from 'react'
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
  SDGSelectionButton,
} from '../styles'
import { Button } from 'pages/CreateEntity/components'
import { sdgIcons as SDG_ICONS } from 'pages/splash/splash-config.json'
import { theme, Typography } from 'modules/App/App.styles'

interface Props {
  name?: string
  values: string[]
  open: boolean
  options: string[]
  selectionType?: 'single' | 'multiple'
  onClose: () => void
  handleChange: (values: string[]) => void
}

const SelectionModal: React.FC<Props> = ({
  name = '',
  values = [],
  open,
  options,
  selectionType = 'single',
  onClose,
  handleChange,
}): JSX.Element => {
  const [selections, setSelections] = useState<string[]>([])
  const isSDG = name === 'SDG'

  useEffect(() => {
    setSelections(values)
  }, [values])

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

  const getSDGIcon = (sdg: string): any => {
    const [sdgFirst] = sdg.split(' – ')
    const sdgNo: number = parseInt(sdgFirst.slice(3))

    return SDG_ICONS[sdgNo - 1]
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
          {!isSDG &&
            _.chunk(options, 3).map((row, rowIdx) => (
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
          {isSDG &&
            _.chunk(options, 5).map((row, rowIdx) => (
              <ModalRow
                key={rowIdx}
                style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
              >
                {row.map((value) => {
                  const sdgIcon = getSDGIcon(value)
                  return (
                    <SDGSelectionButton
                      key={value}
                      bgColor={sdgIcon?.bgColor}
                      selected={selections.some((_) => _ === value)}
                      onClick={(): void => {
                        handleSelect(value)
                      }}
                    >
                      <i className={sdgIcon?.class} />
                      <Typography
                        color={theme.ixoWhite}
                        fontWeight={700}
                        fontSize="16px"
                        lineHeight="19px"
                      >
                        {sdgIcon?.title}
                      </Typography>
                    </SDGSelectionButton>
                  )
                })}
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
