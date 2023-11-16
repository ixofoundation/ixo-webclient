import React from 'react'
import styled, { useTheme } from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router'
import Home from 'assets/icons/Home'
import Select, { components, ControlProps, OptionProps } from 'react-select'

const Control: React.FunctionComponent<ControlProps<any>> = ({ children, ...rest }) => {
  return (
    <components.Control {...rest}>
      {rest.getValue()[0]?.value?.icon} {children}
    </components.Control>
  )
}

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`

const Option: React.FunctionComponent<OptionProps<any>> = ({ children, ...rest }) => {
  return (
    <components.Option {...rest}>
      <OptionWrapper>
        {rest.data.value.icon} {children}
      </OptionWrapper>
    </components.Option>
  )
}

const Navigator: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const theme: any = useTheme()
  const handleNavigatorChange = (event: any): void => {
    history.push(event.value.url)
  }

  const styles = {
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#01283B',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      fontSize: 16,
      color: '#01283B',
      padding: '0 0.625rem',
      height: '2.5rem',
      minHeight: '2.5rem',
      borderColor: state.isFocused ? theme.ixoDarkestBlue : '#fff',
      boxShadow: state.isFocused ? `0 0 0 1px ${theme.ixoDarkestBlue}` : provided.borderColor,
      '&:hover': {
        borderColor: theme.ixoDarkestBlue,
      },
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      '> div': {
        padding: 0,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
    }),
    input: (provided: any) => ({
      ...provided,
      height: '1rem',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '2rem',
    }),
    option: (provided: any) => ({
      ...provided,
      color: '#01283B',
      fontWeight: 400,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#01283B',
      fontWeight: 400,
    }),
  }

  return (
    <Select
      options={[
        {
          value: {
            url: '/test',
            icon: <Home fill='#01283B' />,
          },
          label: 'Navigator',
        },
      ]}
      components={{ Control, Option, IndicatorSeparator: (): null => null }}
      styles={styles}
      isSearchable={false}
      onChange={handleNavigatorChange}
    />
  )
}

export default withRouter(Navigator)
