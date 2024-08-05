import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import _ from 'lodash'
import { ReactComponent as CloseIcon } from '/public/assets/images/icon-close.svg'
import {
  ModalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
  ModalTitle,
  SelectionButton,
  SDGSelectionButton,
} from 'components/Modals/styles'
import { Button } from 'screens/CreateEntity/Components'
import sdgIcons from 'screens/Splash/splash-config.json'
import { Typography } from 'components/Typography'
const SDG_ICONS = sdgIcons.sdgIcons

export const getSDGIcon = (sdg: string): any => {
  const [sdgFirst] = sdg.split(' – ')
  const sdgNo: number = parseInt(sdgFirst.slice(3))

  return SDG_ICONS[sdgNo - 1]
}

interface Props {
  name?: string
  values: string[]
  open: boolean
  options: string[]
  selectionType?: 'single' | 'multiple'
  onClose: () => void
  handleChange?: (values: string[]) => void
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

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalTitle>Select {name}:</ModalTitle>
        <ModalBody>
          {!isSDG &&
            _.chunk(options, 3).map((row, rowIdx) => (
              <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}>
                {row.map((value) => (
                  <SelectionButton
                    key={value}
                    selected={selections.some((_) => _ === value)}
                    onClick={(): void => {
                      handleChange && handleSelect(value)
                    }}
                  >
                    {value}
                  </SelectionButton>
                ))}
              </ModalRow>
            ))}
          {isSDG &&
            _.chunk(options, 5).map((row, rowIdx) => (
              <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}>
                {row.map((value) => {
                  if (!value) {
                    return null
                  }
                  const sdgIcon = getSDGIcon(value)
                  if (!sdgIcon) {
                    return null
                  }
                  return (
                    <SDGSelectionButton
                      key={value}
                      $bgColor={sdgIcon.bgColor}
                      $selected={selections.some((_) => _ === value)}
                      onClick={(): void => {
                        handleChange && handleSelect(value)
                      }}
                    >
                      <i className={sdgIcon.class} />
                      <Typography color='white' weight='bold'>
                        {sdgIcon.title}
                      </Typography>
                    </SDGSelectionButton>
                  )
                })}
              </ModalRow>
            ))}
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={(): void => {
                if (handleChange) {
                  handleChange(selections)
                }
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
