import { Typography } from 'modules/App/App.styles'
import React from 'react'
import styled from 'styled-components'

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Check = styled.span<{ checked: boolean }>`
  margin-right: 10px;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props): string => props.theme.neutralLightGrey};

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

interface Props {
  label?: string
  checked?: boolean
  handleChange: (checked: boolean) => void
}

const CheckBox: React.FC<Props> = ({
  label = '',
  checked = false,
  handleChange,
}): JSX.Element => {
  return (
    <CheckBoxWrapper onClick={(): void => handleChange(!checked)}>
      <Check checked={checked} />
      <Typography fontWeight={400} fontSize="20px" lineHeight="20px">
        {label}
      </Typography>
    </CheckBoxWrapper>
  )
}

export default CheckBox
