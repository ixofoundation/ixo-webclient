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
  options: string[]
  placeholder?: string
  hasArrow?: boolean
}

const Dropdown: React.FC<Props> = ({ options, placeholder, hasArrow = true, ...rest }): JSX.Element => {
  const theme: any = useTheme()
  return (
    <Wrapper size='xl'>
      <Select {...rest} hasArrow={hasArrow} color={rest.value ? theme.ixoBlack : theme.ixoGrey700}>
        {placeholder && <Option value={''}>{placeholder}</Option>}
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Wrapper>
  )
}

export default Dropdown
