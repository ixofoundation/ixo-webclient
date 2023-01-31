import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  height: 12px;
`

interface Props {
  name?: string
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

const RangeInput: React.FC<Props> = ({ name = '', value, min = 0, max = 100, onChange }): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange && onChange(Number(event.target.value))
  }
  return <StyledInput type='range' name={name} min={min} max={max} value={value} onChange={handleChange} />
}

export default RangeInput
