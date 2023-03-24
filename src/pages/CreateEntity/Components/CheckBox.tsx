import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { TTypographyColor, TTypographySize, TTypographyVariant } from 'components/Typography/Typography'
import React from 'react'
import styled from 'styled-components'

const Check = styled.span<{ checked: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props): string => props.theme.ixoGrey500};

  &::after {
    content: ' ';
    opacity: ${(props): number => (props.checked ? 1 : 0)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${(props): string => props.theme.ixoNewBlue};
    transition: opacity 0.2s;
  }
`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  value?: boolean
  textVariant?: TTypographyVariant
  textSize?: TTypographySize
  textColor?: TTypographyColor
  handleChange: (value: boolean) => void
}

const CheckBox: React.FC<Props> = ({
  label = '',
  value = false,
  textVariant = 'primary',
  textSize = 'xl',
  textColor = 'black',
  handleChange,
  ...rest
}): JSX.Element => {
  return (
    <FlexBox cursor='pointer' alignItems='center' gap={2.5} onClick={(): void => handleChange(!value)} {...rest}>
      <Check checked={value} />
      <Typography variant={textVariant} size={textSize} color={textColor}>
        {label}
      </Typography>
    </FlexBox>
  )
}

export default CheckBox
