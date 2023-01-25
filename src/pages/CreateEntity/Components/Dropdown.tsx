import { Typography } from 'components/Typography'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled(Typography)`
  width: 100%;
`
const Select = styled.select`
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  padding: 6px 10px;
  width: 100%;
  cursor: pointer;
`

const Option = styled.option``

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  placeholder?: string
}

const Dropdown: React.FC<Props> = ({ options, placeholder, ...rest }): JSX.Element => {
  return (
    <Wrapper size='xl'>
      <Select {...rest}>
        <Option value={''}>{`Select ${placeholder ?? '...'}`}</Option>
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
