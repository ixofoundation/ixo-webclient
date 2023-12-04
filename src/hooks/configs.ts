import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  selectAssetListConfig,
  selectEntityConfigByGivenType,
  selectEntityConfigByType,
  selectPaymentCoins,
  selectRelayersConfig,
} from 'redux/configs/configs.selectors'
import { AssetType, PaymentCoins } from 'redux/configs/configs.types'
import _ from 'lodash'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import BigNumber from 'bignumber.js'
import { ChainNetwork } from '@ixo/impactxclient-sdk/types/custom_queries/chain.types'
import {
  getAssetListConfigAction,
  getEntityConfigAction,
  getExchangeConfigAction,
  getRelayersConfigAction,
} from 'redux/configs/configs.actions'
import { Schema, SchemaCategory } from 'pages/EntitiesExplorer/Components/EntitiesFilter/schema/types'

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
export const chainNetwork: ChainNetwork = CHAIN_ID?.startsWith('ixo')
  ? 'mainnet'
  : CHAIN_ID?.startsWith('pandora')
  ? 'testnet'
  : 'devnet'

export const IxoCoinCodexRelayerApi = 'https://ixo-coincodex-relayer.ixo-api.workers.dev'
export const WALLET_STORE_LOCAL_STORAGE_KEY = 'ixo-webclient/connectedWalletId'

interface IxoConfigsHookExports {
  paymentCoins: PaymentCoins[]
  getAssetPairs: (chainId?: string) => any[]
  convertToDenom: (coin: Coin | undefined) => Coin | undefined
  convertToMinimalDenom: (coin: Coin | undefined) => Coin | undefined
  getAssetsByChainId: (chainId: string) => AssetType[]
  getRelayerNameByChainId: (chainId: string) => string
  getRelayerNameAndChainIdList: () => { [key: string]: string }
  getRelayerIconByChainId: (chainId: string) => string

  fetchRelayersConfig: () => void
  fetchAssetListConfig: () => void
  fetchExchangeConfig: () => void
  fetchEntityConfig: () => void
}

export function useIxoConfigs(): IxoConfigsHookExports {
  const dispatch = useAppDispatch()
  const assetListConfig = useAppSelector(selectAssetListConfig)
  const relayersConfig = useAppSelector(selectRelayersConfig)
  const paymentCoins: PaymentCoins[] = useAppSelector(selectPaymentCoins)

  const fetchRelayersConfig = useCallback(() => {
    dispatch(getRelayersConfigAction())
  }, [dispatch])

  const fetchAssetListConfig = useCallback(() => {
    dispatch(getAssetListConfigAction())
  }, [dispatch])

  const fetchExchangeConfig = useCallback(() => {
    dispatch(getExchangeConfigAction())
  }, [dispatch])

  const fetchEntityConfig = useCallback(() => {
    dispatch(getEntityConfigAction())
  }, [dispatch])

  const getAssetsByChainId = useCallback(
    (chainId: string): AssetType[] => {
      if (assetListConfig.length > 0) {
        const assetFound = assetListConfig.find((assetList) => assetList.chainId === chainId)
        if (assetFound) {
          return assetFound.assets
        }
      }
      return []
    },
    // eslint-disable-next-line
    [assetListConfig],
  )
  /**
   * @return { base: string; display: string; exponent: number }[]
   */
  const getAssetPairs = useCallback(
    (chainId: string = CHAIN_ID!) => {
      try {
        const assets = getAssetsByChainId(chainId)
        return assets
          .map((asset) => {
            const { base, denomUnits, display } = asset
            const denomUnit = denomUnits.find((unit) => unit.denom === display)
            if (!denomUnit) {
              return undefined
            }
            return { base, display, exponent: denomUnit.exponent }
          })
          .filter((item) => !!item)
      } catch {
        return []
      }
    },
    // eslint-disable-next-line
    [assetListConfig],
  )
  const convertToDenom = useCallback(
    (coin: Coin | undefined): Coin | undefined => {
      if (!coin) {
        return undefined
      }
      const pair = getAssetPairs().find((item: any) => item.base === coin.denom)
      if (!pair) {
        return coin
      }
      const denom = pair.display
      const amount = new BigNumber(coin.amount).dividedBy(Math.pow(10, pair.exponent)).toString()
      return { denom, amount }
    },
    // eslint-disable-next-line
    [assetListConfig],
  )

  const convertToMinimalDenom = useCallback(
    (coin: Coin | undefined): Coin | undefined => {
      if (!coin) {
        return undefined
      }
      const pair = getAssetPairs().find((item: any) => item.display === coin.denom)
      if (!pair) {
        return undefined
      }
      const amount = new BigNumber(coin.amount).times(Math.pow(10, pair.exponent)).toString()
      return { denom: pair.base, amount }
    },
    // eslint-disable-next-line
    [assetListConfig],
  )

  const getRelayerNameByChainId = useCallback(
    (chainId: string): string => {
      if (relayersConfig.length > 0) {
        const relayerFound = relayersConfig.find((relayer) => relayer.chainId === chainId)
        if (relayerFound) {
          return relayerFound.displayName
        }
      }
      return undefined!
    },
    [relayersConfig],
  )

  const getRelayerNameAndChainIdList = useCallback(() => {
    if (relayersConfig.length > 0) {
      const mapped = relayersConfig.map((relayer) => ({
        name: relayer.displayName,
        chainId: relayer.chainId,
      }))

      return _.mapValues(_.keyBy(mapped, 'chainId'), 'name')
    }
    return {}
  }, [relayersConfig])

  const getRelayerIconByChainId = useCallback(
    (chainId: string): string => {
      if (relayersConfig.length > 0) {
        const relayerFound = relayersConfig.find((relayer) => relayer.chainId === chainId)
        if (relayerFound) {
          return relayerFound.stakeCurrency!.coinImageUrl!
        }
      }
      return undefined!
    },
    [relayersConfig],
  )

  return {
    paymentCoins,
    getAssetPairs,
    convertToDenom,
    convertToMinimalDenom,
    getAssetsByChainId,
    getRelayerNameByChainId,
    getRelayerNameAndChainIdList,
    getRelayerIconByChainId,
    fetchRelayersConfig,
    fetchAssetListConfig,
    fetchExchangeConfig,
    fetchEntityConfig,
  }
}

export function useEntityConfig(type?: string): any {
  const entityConfigByType = useAppSelector(type ? selectEntityConfigByGivenType(type) : selectEntityConfigByType)

  return { ...entityConfigByType }
}

export function useClaimTypesConfig(): any {
  const protocolConfig = useEntityConfig('protocol')
  const filterSchema: Schema = protocolConfig.filterSchema as Schema
  const ddoTags: SchemaCategory[] = filterSchema.ddoTags ?? []
  const claimTypes = ddoTags.find((tag: SchemaCategory) => tag.name === 'Claim Type')?.tags ?? []
  return claimTypes
}
