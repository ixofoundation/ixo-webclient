import React from 'react'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router'
import Home from 'assets/icons/Home'
import Select, { components, ControlProps, OptionProps } from 'react-select'

const Control: React.FunctionComponent<ControlProps<any>> = ({
  children,
  ...rest
}) => {
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

const Option: React.FunctionComponent<OptionProps<any>> = ({
  children,
  ...rest
}) => {
  return (
    <components.Option {...rest}>
      <OptionWrapper>
        {rest.data.value.icon} {children}
      </OptionWrapper>
    </components.Option>
  )
}

const styles = {
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#01283B',
  }),
  control: (provided, state) => ({
    ...provided,
    fontSize: 16,
    color: '#01283B',
    padding: '0 0.625rem',
    height: '2.5rem',
    minHeight: '2.5rem',
    borderColor: state.isFocused ? '#002233' : '#fff',
    boxShadow: state.isFocused ? '0 0 0 1px #002233' : provided.borderColor,
    '&:hover': {
      borderColor: '#002233',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    '> div': {
      padding: 0,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
  }),
  input: (provided) => ({
    ...provided,
    height: '1rem',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '2rem',
  }),
  option: (provided) => ({
    ...provided,
    color: '#01283B',
    fontWeight: 400,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#01283B',
    fontWeight: 400,
  }),
}

const Navigator: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const handleNavigatorChange = (event): void => {
    history.push(event.value.url)
  }

  return (
    <Select
      options={[
        {
          value: {
            url: '/test',
            icon: <Home fill="#01283B" />,
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
