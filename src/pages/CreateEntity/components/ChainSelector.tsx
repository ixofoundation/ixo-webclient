import React from 'react'
import styled from 'styled-components'
import { theme } from 'modules/App/App.styles'
import ReactSelect, { StylesConfig, components } from 'react-select'
import { useIxoConfigs } from 'states/configs/configs.hooks'

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ChainSelectStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    width: 200,
    height: 48,
    borderColor: theme.ixoNewBlue,
    borderRadius: 8,
    boxShadow: 'none',

    [`&:hover`]: {
      borderColor: theme.ixoNewBlue,
      borderWidth: 1,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: theme.secondaryFontFamily,
    color: theme.ixoBlack,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '28px',
  }),
}

interface Props {
  chainId: string
  onChange: (chainId: string) => void
}

const ChainSelector: React.FC<Props> = ({ chainId, onChange }): JSX.Element => {
  const { getRelayerNameByChainId, getRelayerNameAndChainIdList } = useIxoConfigs()
  const Chains = getRelayerNameAndChainIdList()

  const ValueContainer = (props: any): JSX.Element => {
    const [{ value }] = props.getValue()
    return (
      <components.ValueContainer {...props}>
        <ValueWrapper>
          {value && <img src={require('assets/tokens/ixo.svg')} width='32px' alt='' />}
          {props.children}
        </ValueWrapper>
      </components.ValueContainer>
    )
  }

  return (
    <ReactSelect
      styles={ChainSelectStyles}
      placeholder='Select a Chain'
      value={{ label: getRelayerNameByChainId(chainId), value: chainId }}
      options={Object.entries(Chains).map(([chainId, chainName]) => ({
        label: chainName,
        value: chainId,
      }))}
      onChange={(newValue: any): void => onChange(newValue?.value)}
      components={{ ValueContainer }}
    />
  )
}

export default ChainSelector
