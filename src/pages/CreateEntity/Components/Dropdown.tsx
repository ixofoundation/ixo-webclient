import { Typography } from 'components/Typography'
import React from 'react'
import styled, { css, useTheme } from 'styled-components'

const HideArrowCss = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
`

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  // background: white;
`
const Select = styled.select<{ color: string; hasArrow: boolean }>`
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  padding: 6px 10px;
  width: 100%;
  height: 48px;
  cursor: pointer;
  color: ${({ color }) => color};

  ${({ hasArrow }) => !hasArrow && HideArrowCss};

  ::-ms-expand {
    ${({ hasArrow }) => !hasArrow && 'display: none'};
  }

  &:disabled {
    border-color: ${(props) => props.theme.ixoGrey500};
  }

  &:focus-visible {
    outline: none;
  }
`
const SelectLabel = styled.label`
  position: absolute;
  left: 7px;
  transform: translateY(-50%);
  top: 0;
  pointer-events: none;
  transition: all 0.2s;
  background: inherit;

  margin: 0;
  padding: 0 3px;
  font-size: 12px;
  line-height: 100%;
`

const Option = styled.option``

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; text: string }[]
  placeholder?: string
  hasArrow?: boolean
  wrapperStyle?: React.CSSProperties
  label?: string
}

const Dropdown: React.FC<Props> = ({
  options,
  placeholder,
  hasArrow = false,
  wrapperStyle = {},
  label = '',
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <Wrapper style={{ color: rest.disabled ? theme.ixoGrey500 : theme.ixoNewBlue, ...(wrapperStyle ?? {}) }}>
      {label && (
        <SelectLabel>
          <Typography weight={'bold'} size={'sm'} style={{ background: 'white' }}>
            {label}
          </Typography>
        </SelectLabel>
      )}
      <Typography size='xl' style={{ width: '100%' }}>
        <Select {...rest} hasArrow={hasArrow} color={theme.ixoBlack}>
          {placeholder && <Option value={''}>{placeholder}</Option>}
          {options.map(({ value, text }) => (
            <Option key={value} value={value}>
              {text}
            </Option>
          ))}
        </Select>
      </Typography>
    </Wrapper>
  )
}

export default Dropdown
