import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  line-height: 28px;
  font-size: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: transparent;
  border: none;
  outline: none;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const InputWrapper = styled.div<{ width: string }>`
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  transition: all 0.2s;
`

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: any
  width?: string
  handleChange: (value: any) => void
}

const Input: React.FC<Props> = ({
  inputValue,
  width = '100%',
  handleChange,
  ...rest
}): JSX.Element => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    handleChange(newValue)
  }
  return (
    <InputWrapper width={width}>
      <StyledInput value={inputValue ?? ''} onChange={onChange} {...rest} />
    </InputWrapper>
  )
}

export default Input
