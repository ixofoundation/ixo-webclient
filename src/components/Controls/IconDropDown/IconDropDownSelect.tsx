import React, { useEffect, useState } from 'react'
import { DropDownOption } from './types'
import { Container, SelectContainer, SelectLabelWrapper } from './IconDropDownSelect.styles'
import { requireCheckDefault } from 'utils/images'
import { Typography } from 'components/Typography'
import { InputLabel } from 'components/Form/InputWithLabel'

interface Props {
  options: DropDownOption[]
  value: string //  Authorisation, etc
  selectText: string //  Select Resource Type
  excludes?: string[]
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
  label?: string
}

const DropDownImageSelect: React.FunctionComponent<Props> = ({
  options,
  value,
  selectText,
  excludes = [],
  onChange,
  onBlur,
  onFocus,
  label,
}) => {
  const [selectedIconSRC, setSelectedIconSRC] = useState<string | null>('')
  const onChangeHandler = (value: string): void => {
    if (!!value && value.length > 0) {
      const selectedOption = options.find((option) => option.value === value)
      if (!selectedOption) {
        setSelectedIconSRC(null)
      } else {
        setSelectedIconSRC(selectedOption.iconAssetPath)
      }
    } else {
      setSelectedIconSRC(null)
    }
    onChange(value)
  }

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value)
    if (!selectedOption) {
      setSelectedIconSRC(null)
    } else {
      setSelectedIconSRC(selectedOption.iconAssetPath)
    }
  }, [options, value])

  return (
    <Container>
      <SelectLabelWrapper>
        {label && (
          <InputLabel $filled={Boolean(value)}>
            <Typography
              weight={value ? 'bold' : 'medium'}
              size={value ? 'sm' : 'xl'}
              color={value ? 'inherit' : 'grey500'}
            >
              {label}
            </Typography>
          </InputLabel>
        )}
      </SelectLabelWrapper>
      <SelectContainer
        value={value}
        onChange={(e): void => onChangeHandler(e.target.value)}
        onBlur={(): void => onBlur(value)}
        onFocus={(): void => onFocus(value)}
        className={value && value.length > 0 ? 'active' : undefined}
        id='symbol'
      >
        <option value=''>{selectText}</option>
        {options
          .filter((opt) => !excludes.some((val) => val === opt.value) || opt.value === value)
          .map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={
                selectedIconSRC
                  ? {
                      background: `url(assets${selectedIconSRC.toLowerCase()})`,
                    }
                  : {}
              }
            >
              {opt.text}
            </option>
          ))}
      </SelectContainer>
      {selectedIconSRC && <img src={`/assets${selectedIconSRC.toLowerCase()}`} alt='icon' />}
    </Container>
  )
}

export default React.memo(DropDownImageSelect)
