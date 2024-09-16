import { createSelector } from '@reduxjs/toolkit'
import { selectEntityType } from 'redux/currentEntity/currentEntity.selectors'
import { RootState } from 'redux/store'
import { EntityConfig } from 'types/entities'
import { toRootEntityType } from 'utils/entities'
import { AssetListConfig, ConfigsState, CurrencyInfo, ExchangeConfig, PaymentCoins, RelayerInfo } from './configs.types'

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

export const selectConfigs = (state: RootState): ConfigsState => {
  return state.configs
}

export const selectAssetListConfig = createSelector(selectConfigs, (configs: ConfigsState): AssetListConfig[] => {
  return configs.assetListConfig
})

export const selectRelayersConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): RelayerInfo[] => configs.relayersConfig,
)

export const selectExchangeConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): ExchangeConfig => configs?.exchangeConfig,
)

export const selectMyRelayer = createSelector(selectRelayersConfig, (relayers: RelayerInfo[]): RelayerInfo => {
  return relayers?.find((relayer) => relayer.chainId === chainId)!
})

export const selectPaymentCoins = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): PaymentCoins[] => relayer?.paymentCoins ?? [],
)

export const selectCurrencies = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): CurrencyInfo[] => relayer.currencies,
)

export const selectTradingAllowed = createSelector(
  selectExchangeConfig,
  (exchangeConfig: ExchangeConfig): boolean => exchangeConfig?.tradingAllowed,
)

/**
 * @description EntityConfig selectors
 */
export const selectEntityConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): EntityConfig => configs?.entityConfig,
)

export const selectEntityConfigByType = createSelector(
  selectEntityType,
  selectConfigs,
  (entityType: string, configs: ConfigsState): any =>
    configs.entityConfig && configs.entityConfig[toRootEntityType(entityType)],
)

export const selectEntityConfigByGivenType = (type: string) =>
  createSelector(selectConfigs, (configs: ConfigsState): any => configs.entityConfig && configs.entityConfig[type])

/**
 * @description RelayerConfig selectors
 */
export const selectRelayerConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): RelayerInfo[] => configs.relayersConfig,
)

export const selectRelayerByChainId = (chainId: string) =>
  createSelector(selectRelayerConfig, (config: RelayerInfo[]): RelayerInfo | undefined =>
    config.find((v) => v.chainId === chainId),
  )
