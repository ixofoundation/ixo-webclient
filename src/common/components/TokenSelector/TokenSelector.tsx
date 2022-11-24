import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select, { components } from 'react-select'
import Wallet from 'assets/icons/Wallet'
import { theme } from 'modules/App/App.styles'
import { Coin } from '@cosmjs/proto-signing'

const SelectorWrapper = styled.div`
  position: relative;

  & input {
    margin: 0px !important;
  }
`
const AvailableAmount = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: italic;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #537b8e;
`

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

interface Props {
  label?: string
  disable?: boolean
  tokens: Coin[]
  selectedToken: Coin
  icon?: JSX.Element
  handleChange: (value: Coin) => void
}

const TokenSelector: React.FunctionComponent<Props> = ({
  label = null,
  disable = false,
  tokens,
  selectedToken,
  icon = <Wallet />,
  handleChange,
}) => {
  const customStyles = {
    indicatorsContainer: (provided: any): any => ({
      ...provided,
      fontSize: 20,
      alignItems: 'flex-start',
      marginRight: '-25px',
      opacity: 0,
      pointerEvents: 'none',
    }),
    dropdownIndicator: (): any => ({
      fontSize: 8,
      padding: '0 4px',
    }),
    indicatorSeparator: (): any => ({
      display: 'none',
    }),
    control: (provided: any): any => ({
      ...provided,
      background: 'transparent',
      border: 'none !important',
      boxShadow: 'none !important',
    }),
    valueContainer: (provided: any): any => ({
      ...provided,
      background: '#03324A',
      borderRadius: '4px',
      border: `0.5px solid ${disable ? 'transparent' : '#49BFE0'}`,
      display: 'flex',
      flexGrow: 1,
      padding: 15,
      paddingLeft: 12,

      '& > div:last-child': {
        margin: 0,
        padding: 0,
      },
    }),
    input: (provided: any): any => ({
      ...provided,
      color: 'white',
      caretColor: 'transparent',
    }),
    menu: (provided: any): any => ({
      ...provided,
      maxWidth: '100%',
      margin: 0,
      background: '#03324A',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      zIndex: 200,
    }),
    menuPortal: (provided: any): any => ({
      ...provided,
      zIndex: 200,
      color: '#FFFFFF',
    }),
    option: (provided: any, { data, isFocused, isSelected }: any): any => ({
      ...provided,
      color: isFocused && !isSelected ? '#03324A' : data.color,
      paddingLeft: 15,
      paddingRight: 15,
    }),
    singleValue: (provided: any): any => ({
      ...provided,
      color: 'white',
      margin: 0,
      fontWeight: 700,
      fontSize: '16px',
    }),
    placeholder: (provided: any): any => ({
      ...provided,
      color: '#537B8E',
      fontFamily: theme.primaryFontFamily,
      fontWeight: 'bold',
      fontSize: '15px',
    }),
  }

  const DropdownIndicator = (props: any): JSX.Element => {
    return (
      <components.DropdownIndicator {...props}>
        <svg width='17' height='10' viewBox='0 0 17 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.2922 0.361711C15.8015 -0.122188 15.006 -0.122188 14.5153 0.361711L8.33002 6.46167L2.14475 0.361711C1.65408 -0.122188 0.858551 -0.122188 0.367884 0.361711C-0.122784 0.84561 -0.122784 1.63017 0.367884 2.11406L7.44159 9.0902C7.93226 9.5741 8.72778 9.5741 9.21845 9.0902L16.2922 2.11406C16.7828 1.63017 16.7828 0.84561 16.2922 0.361711Z'
            fill={props.isFocused ? '#49BFE0' : '#436779'}
          />
        </svg>
      </components.DropdownIndicator>
    )
  }

  const ValueContainer = (props: any): JSX.Element => (
    <components.ValueContainer {...props}>
      <IconWrapper>{icon}</IconWrapper>
      {props.children}
    </components.ValueContainer>
  )

  const options = useMemo(() => {
    return tokens.map((token: Coin) => ({
      value: token,
      label: token!.denom!.toUpperCase(),
    }))
  }, [tokens])

  const handleTokenChange = (event: any): void => {
    handleChange(event.value)
  }

  return (
    <SelectorWrapper style={disable ? { pointerEvents: 'none' } : {}}>
      <Select
        styles={customStyles}
        options={options}
        menuPosition='fixed'
        menuPortalTarget={document.body}
        components={{
          DropdownIndicator,
          ValueContainer,
        }}
        value={
          selectedToken
            ? {
                value: selectedToken,
                label: selectedToken.denom!.toUpperCase(),
              }
            : null
        }
        placeholder='Select Asset'
        onChange={handleTokenChange}
      />
      {label && <AvailableAmount>{label}</AvailableAmount>}
    </SelectorWrapper>
  )
}

export default TokenSelector
