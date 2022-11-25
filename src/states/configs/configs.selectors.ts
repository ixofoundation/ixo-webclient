import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { AssetListConfig, ConfigsState, CurrencyInfo, ExchangeConfig, PaymentCoins, RelayerInfo } from './configs.types'

const chainId = process.env.REACT_APP_CHAIN_ID

export const selectConfigs = (state: RootState): ConfigsState => state.configs

export const selectAssetListConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): AssetListConfig[] => configs.assetListConfig,
)

export const selectRelayersConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): RelayerInfo[] => configs.relayersConfig,
)

export const selectExchangeConfig = createSelector(
  selectConfigs,
  (configs: ConfigsState): ExchangeConfig => configs.exchangeConfig,
)

export const selectMyRelayer = createSelector(selectRelayersConfig, (relayers: RelayerInfo[]): RelayerInfo => {
  return relayers.find((relayer) => relayer.chainId === chainId)!
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
  (exchangeConfig: ExchangeConfig): boolean => exchangeConfig.tradingAllowed,
)
