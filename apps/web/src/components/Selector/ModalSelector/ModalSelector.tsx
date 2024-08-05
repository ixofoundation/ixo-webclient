import { useMemo } from 'react'
import Select, { components, StylesConfig } from 'react-select'
import styled, { useTheme } from 'styled-components'

const SelectorWrapper = styled.div`
  position: relative;

  & input {
    margin: 0px !important;
  }
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
  disable?: boolean
  tokens?: string[]
  selectedToken?: string
  icon?: JSX.Element
  placeholder?: string
  handleChange?: (value: string) => void
}

const ModalSelector: React.FunctionComponent<Props> = ({
  disable = false,
  tokens,
  selectedToken,
  placeholder,
  icon,
  handleChange,
}) => {
  const theme = useMantineTheme()
  const customStyles: StylesConfig<any, false> = {
    indicatorsContainer: (provided): any => ({
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
    control: (provided): any => ({
      ...provided,
      background: 'transparent',
      border: 'none !important',
      boxShadow: 'none !important',
    }),
    valueContainer: (provided): any => ({
      ...provided,
      background: '#03324A',
      borderRadius: '4px',
      border: `0.5px solid ${disable ? 'transparent' : theme.colors.blue[5]}`,
      display: 'flex',
      flexGrow: 1,
      padding: 15,
      paddingLeft: 12,

      '& > div:last-child': {
        margin: 0,
        padding: 0,
      },
    }),
    input: (provided): any => ({
      ...provided,
      color: 'white',
      caretColor: 'transparent',
    }),
    menu: (provided): any => ({
      ...provided,
      maxWidth: '100%',
      margin: 0,
      background: '#03324A',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      zIndex: 200,
    }),
    menuPortal: (provided): any => ({
      ...provided,
      zIndex: 200,
      color: '#FFFFFF',
    }),
    option: (provided, { data, isFocused, isSelected }): any => ({
      ...provided,
      color: isFocused && !isSelected ? '#03324A' : data.color,
      paddingLeft: 15,
      paddingRight: 15,
    }),
    singleValue: (provided): any => ({
      ...provided,
      color: 'white',
      marginLeft: 0,
      fontWeight: 700,
      fontSize: '16px',
    }),
    placeholder: (provided): any => ({
      ...provided,
      marginLeft: 35,
      color: '#537B8E',
      fontWeight: 700,
      fontSize: '16px',
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
            fill={props.isFocused ? theme.colors.blue[5] : '#436779'}
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
    return tokens!.map((token: string) => ({
      value: token,
      label: token.toUpperCase(),
    }))
  }, [tokens])

  const handleTokenChange = (event: any): void => {
    handleChange!(event.value)
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
        value={selectedToken ? { value: selectedToken, label: selectedToken.toUpperCase() } : null}
        placeholder={placeholder}
        onChange={handleTokenChange}
      />
    </SelectorWrapper>
  )
}

export default ModalSelector
