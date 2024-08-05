import React from 'react'
import styled, { useTheme } from 'styled-components'
import ReactSelect, { StylesConfig, components } from 'react-select'
import { requireCheckDefault } from 'utils/images'
import { useIxoConfigs } from 'hooks/configs'

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

interface Props {
  chainId: string
  onChange: (chainId: string) => void
}

const ChainSelector: React.FC<Props> = ({ chainId, onChange }): JSX.Element => {
  const theme = useMantineTheme()
  const { getRelayerNameByChainId, getRelayerNameAndChainIdList } = useIxoConfigs()
  const Chains = getRelayerNameAndChainIdList()

  const ValueContainer = (props: any): JSX.Element => {
    const [{ value }] = props.getValue()
    return (
      <components.ValueContainer {...props}>
        <ValueWrapper>
          {value && <img src='/public/assets/tokens/ixo.svg' width='32px' alt='' />}
          {props.children}
        </ValueWrapper>
      </components.ValueContainer>
    )
  }

  const ChainSelectStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      width: 200,
      height: 48,
      borderColor: theme.colors.blue[5],
      borderRadius: 8,
      boxShadow: 'none',

      [`&:hover`]: {
        borderColor: theme.colors.blue[5],
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
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
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
      menuPortalTarget={document.body}
    />
  )
}

export default ChainSelector
