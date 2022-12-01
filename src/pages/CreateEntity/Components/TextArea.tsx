import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea<{ width: string; height: string }>`
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};

  padding: 20px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  line-height: 18px;
  font-size: 15px;
  color: ${(props): string => props.theme.ixoBlack};
  background: transparent;
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

  &::placeholder {
    color: #828e94;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputValue: string
  width?: string
  height?: string
  handleChange: (value: string) => void
}

const TextArea: React.FC<Props> = ({
  inputValue,
  width = '100%',
  height = 'auto',
  handleChange,
  ...rest
}): JSX.Element => {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value
    handleChange(newValue)
  }
  return (
    <StyledTextArea
      width={width}
      height={height}
      value={inputValue ?? ''}
      onChange={onChange}
      {...rest}
    />
  )
}

export default TextArea
