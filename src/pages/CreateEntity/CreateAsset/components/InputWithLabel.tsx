import React, { ChangeEvent, useRef, useState } from 'react'
import styled from 'styled-components'

const InputLabel = styled.label<{ focused?: boolean }>`
  position: absolute;
  left: 10px;
  transform: translateY(-50%);
  top: ${(props): string => (props.focused ? '-5px' : '50%')};
  pointer-events: none;
  transition: all 0.2s;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  line-height: 100%;
  font-size: ${(props): string => (props.focused ? '12px' : '20px')};
  color: ${(props): string =>
    props.focused
      ? props.theme.ixoNewBlue
      : props.theme.ixoMediumGrey + ' !important'};
`

const ErrorLabel = styled.label`
  position: absolute;
  left: 10px;
  transform: translateY(-50%);
  bottom: -26px;
  pointer-events: none;
  transition: all 0.2s;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 300;
  line-height: 100%;
  font-size: 10px;
  color: ${(props): string => props.theme.ixoRed};
`

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
`

const InputWrapper = styled.div<{
  width: string
  height: string
  isError: boolean
}>`
  position: relative;
  border-radius: 8px;
  border: 1px solid
    ${(props): string =>
      props.isError ? props.theme.ixoRed : props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};
  transition: all 0.2s;

  ${InputLabel}, ${StyledInput} {
    ${(props): string => props.isError && `color: ${props.theme.ixoRed};`}
  }
`

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: any
  label?: string
  width?: string
  height?: string
  error?: string
  handleChange: (value: any) => void
}

const InputWithLabel: React.FC<Props> = ({
  inputValue,
  label = '',
  error,
  width = '100%',
  height = 'auto',
  handleChange,
  ...rest
}): JSX.Element => {
  const inputRef = useRef(undefined)
  const [focused, setFocused] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    handleChange(newValue)
  }

  return (
    <InputWrapper width={width} height={height} isError={!!error}>
      <InputLabel focused={focused || !!inputValue}>{label}</InputLabel>
      <StyledInput
        ref={inputRef}
        value={inputValue ?? ''}
        onChange={onChange}
        onFocus={(): void => setFocused(true)}
        onBlur={(): void => setFocused(false)}
        {...rest}
      />
      <ErrorLabel>{error}</ErrorLabel>
    </InputWrapper>
  )
}

export default InputWithLabel
