import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { ChangeEvent, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const StyledTextArea = styled.textarea<{ width: string; height: string }>`
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  width: ${(props): string => props.width};
  height: ${(props): string => props.height};

  padding: 10px;
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
    color: ${(props): string => props.theme.ixoGrey500};
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:disabled {
    border: 1px solid ${(props): string => props.theme.ixoGrey500};
  }
`

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputValue: string
  width?: string
  height?: string
  label?: string
  handleChange?: (value: string) => void
}

const TextArea: React.FC<Props> = ({
  inputValue,
  width = '100%',
  height = 'auto',
  label,
  handleChange,
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  const [focused, setFocused] = useState(false)
  const active = focused || inputValue?.length > 0

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value
    handleChange && handleChange(newValue)
  }
  return (
    <Box
      position='relative'
      width='100%'
      $lineHeight='0'
      style={{ color: rest.disabled ? theme.ixoGrey500 : theme.ixoNewBlue }}
    >
      {label && (
        <Box
          position='absolute'
          transform='translateY(-50%)'
          left={'10px'}
          top={active ? '0' : '26px'}
          transition={'top .2s'}
          background={theme.ixoWhite}
          $zIndex={1}
          $pointerEvents='none'
        >
          <Typography
            size={active ? 'sm' : 'xl'}
            weight={active ? 'bold' : 'medium'}
            color={active ? 'inherit' : 'grey500'}
          >
            {label}
          </Typography>
        </Box>
      )}
      <StyledTextArea
        width={width}
        height={height}
        value={inputValue ?? ''}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </Box>
  )
}

export default TextArea
