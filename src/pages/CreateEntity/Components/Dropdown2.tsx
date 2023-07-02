import { Typography } from 'components/Typography'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'

const HideArrowCss = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
`

const Wrapper = styled(Typography)`
  width: 100%;
`
const Select = styled.select<{ color: string; hasArrow: boolean }>`
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  padding: 6px 10px;
  width: 100%;
  cursor: pointer;
  color: ${({ color }) => color};

  ${({ hasArrow }) => !hasArrow && HideArrowCss};

  ::-ms-expand {
    ${({ hasArrow }) => !hasArrow && 'display: none'};
  }
`

const Option = styled.option``

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; text: string }[]
  placeholder?: string
  hasArrow?: boolean
  wrapperStyle?: React.CSSProperties
}

const Dropdown: React.FC<Props> = ({
  options,
  placeholder,
  hasArrow = false,
  wrapperStyle = {},
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <Wrapper size='xl' style={wrapperStyle}>
      <Select {...rest} hasArrow={hasArrow} color={theme.ixoBlack}>
        {placeholder && <Option value={''}>{placeholder}</Option>}
        {options.map(({ value, text }) => (
          <Option key={value} value={value}>
            {text}
          </Option>
        ))}
      </Select>
    </Wrapper>
  )
}

export default Dropdown
