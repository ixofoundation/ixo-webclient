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

  &::placeholder {
    color: ${(props) => props.theme.ixoGrey500};
  }
`

const InputWrapper = styled.div<{ width: string; height: string }>`
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.colors.blue[5]};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
`

const InputPreIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translate(-50%, -50%);
  display: flex;
`

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: any
  width?: string
  height?: string
  preIcon?: React.ReactElement
  handleChange?: (value: any) => void
  wrapperStyle?: React.CSSProperties
}

const Input: React.FC<Props> = ({
  inputValue,
  width = '100%',
  height = 'auto',
  preIcon,
  handleChange,
  wrapperStyle = {},
  ...rest
}): JSX.Element => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    handleChange && handleChange(newValue)
  }
  return (
    <InputWrapper width={width} height={height} style={wrapperStyle}>
      {preIcon && <InputPreIcon>{preIcon}</InputPreIcon>}
      <StyledInput
        value={inputValue ?? ''}
        onChange={onChange}
        {...rest}
        style={preIcon ? { ...rest.style, paddingLeft: 40 } : { ...rest.style }}
      />
    </InputWrapper>
  )
}

export default Input
