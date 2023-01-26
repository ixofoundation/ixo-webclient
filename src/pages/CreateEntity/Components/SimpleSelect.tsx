import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  &::-ms-expand {
    display: none;
  }

  text-align: center;
  width: 200px;
  height: 48px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  cursor: pointer;
`

interface Props {
  name?: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const SimpleSelect: React.FC<Props> = ({ name, value, options, onChange }): JSX.Element => {
  return (
    <StyledSelect name={name} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option[0].toUpperCase() + option.slice(1)}
        </option>
      ))}
    </StyledSelect>
  )
}

export default SimpleSelect
