import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select, { components } from 'react-select'
import Wallet from 'assets/icons/Wallet'
import { Currency } from 'types/models'

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="17"
        height="10"
        viewBox="0 0 17 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.2922 0.361711C15.8015 -0.122188 15.006 -0.122188 14.5153 0.361711L8.33002 6.46167L2.14475 0.361711C1.65408 -0.122188 0.858551 -0.122188 0.367884 0.361711C-0.122784 0.84561 -0.122784 1.63017 0.367884 2.11406L7.44159 9.0902C7.93226 9.5741 8.72778 9.5741 9.21845 9.0902L16.2922 2.11406C16.7828 1.63017 16.7828 0.84561 16.2922 0.361711Z"
          fill={props.isFocused ? '#49BFE0' : '#436779'}
        />
      </svg>
    </components.DropdownIndicator>
  )
}

const IconWrapper = styled.div`
  background: #053f5c;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
`

const ValueContainer = (props) => (
  <components.ValueContainer {...props}>
    <IconWrapper>
      <Wallet />
    </IconWrapper>
    {props.children}
  </components.ValueContainer>
)

interface Props {
  tokens: Currency[]
}

const TokenSelector: React.FunctionComponent<Props> = ({ tokens }) => {
  const customStyles = useMemo(
    () => ({
      indicatorsContainer: (provided) => ({
        ...provided,
        fontSize: 20,
        alignItems: 'flex-start',
        marginRight: '-25px',
      }),
      dropdownIndicator: (provided) => ({
        fontSize: 8,
        padding: '0 4px',
      }),
      indicatorSeparator: (provided) => ({
        display: 'none',
      }),
      control: (provided) => ({
        ...provided,
        background: 'transparent',
        border: 'none !important',
        boxShadow: 'none !important',
      }),
      valueContainer: (provided) => ({
        ...provided,
        background: '#03324A',
        borderRadius: '4px',
        border: '0.5px solid #49BFE0',
        flexGrow: 1,
        paddingLeft: 12,
        paddingRight: 12,
      }),
      input: (provided) => ({
        ...provided,
        color: 'white',
      }),
      menu: (provided) => ({
        ...provided,
        maxWidth: 'calc(100% - 25px)',
        margin: 0,
        background: '#03324A',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }),
      option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
        ...provided,
        color: isFocused && !isSelected ? '#03324A' : data.color,
        paddingLeft: 15,
        paddingRight: 15,
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white',
        marginLeft: 35,
      }),
      placeholder: (provided) => ({
        ...provided,
        marginLeft: 35,
        color: '#537B8E',
      }),
    }),
    [],
  )

  const options = useMemo(() => {
    return tokens.map((token) => ({
      value: token,
      label: token.denom.toUpperCase(),
    }))
  }, [tokens])

  return (
    <Select
      styles={customStyles}
      options={options}
      components={{
        DropdownIndicator,
        ValueContainer,
      }}
    />
  )
}

export default TokenSelector
