import React, { useMemo } from 'react'
import styled from 'styled-components'
import Select, { components } from 'react-select'
import DefaultValidatorLogo from 'assets/img/relayer.png'

const SelectorWrapper = styled.div`
  position: relative;
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

  & > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`

interface ValidatorInfo {
  name: string
  address: string
  logo: string
}

const DropdownIndicator = (props): JSX.Element => {
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

const ValueContainer = (props): JSX.Element => {
  const selectedValue = props.getValue()[0]
  return (
    <components.ValueContainer {...props}>
      <IconWrapper>
        <img
          src={selectedValue ? selectedValue.value.logo : DefaultValidatorLogo}
          alt="validator"
        />
      </IconWrapper>
      {props.children}
    </components.ValueContainer>
  )
}

interface Props {
  disable: boolean
  selectedValidator: ValidatorInfo
  validators: ValidatorInfo[]
  handleChange: (value: ValidatorInfo) => void
}

const ValidatorSelector: React.FunctionComponent<Props> = ({
  disable,
  validators,
  selectedValidator,
  handleChange,
}) => {
  const customStyles = {
    indicatorsContainer: (provided): object => ({
      ...provided,
      fontSize: 20,
      alignItems: 'flex-start',
      marginRight: '-25px',
      opacity: 0,
      pointerEvents: 'none',
    }),
    dropdownIndicator: (): object => ({
      fontSize: 8,
      padding: '0 4px',
    }),
    indicatorSeparator: (): object => ({
      display: 'none',
    }),
    control: (provided): object => ({
      ...provided,
      background: 'transparent',
      border: 'none !important',
      boxShadow: 'none !important',
    }),
    valueContainer: (provided): object => ({
      ...provided,
      background: '#03324A',
      borderRadius: '4px',
      border: `0.5px solid ${disable ? 'transparent' : '#49BFE0'}`,
      flexGrow: 1,
      paddingLeft: 12,
      paddingRight: 12,
    }),
    input: (provided): object => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided): object => ({
      ...provided,
      maxWidth: '100%',
      margin: 0,
      background: '#03324A',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      zIndex: 200,
    }),
    menuPortal: (provided): object => ({
      ...provided,
      zIndex: 200,
      color: '#FFFFFF',
    }),
    option: (provided, { data, isFocused, isSelected }): object => ({
      ...provided,
      color: isFocused && !isSelected ? '#03324A' : data.color,
      paddingLeft: 15,
      paddingRight: 15,
    }),
    singleValue: (provided): object => ({
      ...provided,
      color: 'white',
      marginLeft: 35,
    }),
    placeholder: (provided): object => ({
      ...provided,
      marginLeft: 35,
      color: '#537B8E',
    }),
  }

  const options = useMemo(() => {
    return validators.map((token: ValidatorInfo) => ({
      value: token,
      label: token.name,
    }))
  }, [validators])

  const handleValidatorChange = (event: any): void => {
    handleChange(event.value)
  }

  return (
    <SelectorWrapper style={disable ? { pointerEvents: 'none' } : {}}>
      <Select
        styles={customStyles}
        options={options}
        menuPosition="fixed"
        menuPortalTarget={document.body}
        components={{
          DropdownIndicator,
          ValueContainer,
        }}
        value={
          selectedValidator
            ? {
                value: selectedValidator,
                label: selectedValidator.name,
              }
            : null
        }
        placeholder="Select Validators"
        onChange={handleValidatorChange}
      />
    </SelectorWrapper>
  )
}

export default ValidatorSelector
