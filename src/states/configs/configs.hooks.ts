import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  selectAssetListConfig,
  selectRelayersConfig,
} from './configs.selectors'
import { AssetType } from './configs.types'
import _ from 'lodash'
import { Coin } from '@cosmjs/proto-signing'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

interface IxoConfigsHookExports {
  getAssetPairs: (chainId?: string) => any[]
  convertToDenom: (coin: Coin) => Coin | undefined
  convertToMinimalDenom: (coin: Coin) => Coin | undefined
  getAssetsByChainId: (chainId: string) => AssetType[]
  getRelayerNameByChainId: (chainId: string) => string
  getRelayerNameAndChainIdList: () => { [key: string]: string }
  getRelayerIconByChainId: (chainId: string) => string
}

export function useIxoConfigs(): IxoConfigsHookExports {
  const assetListConfig = useSelector(selectAssetListConfig)
  const relayersConfig = useSelector(selectRelayersConfig)

  const getAssetsByChainId = useCallback(
    (chainId: string): AssetType[] => {
      if (assetListConfig.length > 0) {
        const assetFound = assetListConfig.find(
          (assetList) => assetList.chainId === chainId,
        )
        if (assetFound) {
          return assetFound.assets
        }
      }
      return []
    },
    // eslint-disable-next-line
    [assetListConfig],
  )
  const getAssetPairs = useCallback(
    (chainId: string = CHAIN_ID) => {
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
    },
    // eslint-disable-next-line
    [assetListConfig],
  )
  const convertToDenom = useCallback(
    (coin: Coin): Coin | undefined => {
      if (!coin) {
        return undefined
      }
      const pair = getAssetPairs().find((item) => item.base === coin.denom)
      if (!pair) {
        return undefined
      }
      const denom = pair.display
      const amount = new BigNumber(coin.amount)
        .dividedBy(Math.pow(10, pair.exponent))
        .toString()
      return { denom, amount }
    },
    // eslint-disable-next-line
    [assetListConfig],
  )

  const convertToMinimalDenom = useCallback(
    (coin: Coin): Coin | undefined => {
      if (!coin) {
        return undefined
      }
      const pair = getAssetPairs().find((item) => item.display === coin.denom)
      if (!pair) {
        return undefined
      }
      const amount = new BigNumber(coin.amount)
        .times(Math.pow(10, pair.exponent))
        .toString()
      return { denom: pair.base, amount }
    },
    // eslint-disable-next-line
    [assetListConfig],
  )

  const getRelayerNameByChainId = useCallback(
    (chainId: string): string => {
      if (relayersConfig.length > 0) {
        const relayerFound = relayersConfig.find(
          (relayer) => relayer.chainId === chainId,
        )
        if (relayerFound) {
          return relayerFound.displayName
        }
      }
      return undefined
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
        const relayerFound = relayersConfig.find(
          (relayer) => relayer.chainId === chainId,
        )
        if (relayerFound) {
          return relayerFound.stakeCurrency?.coinImageUrl
        }
      }
      return undefined
    },
    [relayersConfig],
  )

  return {
    getAssetPairs,
    convertToDenom,
    convertToMinimalDenom,
    getAssetsByChainId,
    getRelayerNameByChainId,
    getRelayerNameAndChainIdList,
    getRelayerIconByChainId,
  }
}
