import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectAssetListConfig, selectRelayersConfig } from './configs.selectors'
import { AssetType } from './configs.types'
import _ from 'lodash'

interface IxoConfigsHookExports {
  getAssetsByChainId: (chainId: string) => AssetType[]
  getRelayerNameByChainId: (chainId: string) => string
  getRelayerNameAndChainIdList: () => { [key: string]: string }
}

export function useIxoConfigs(): IxoConfigsHookExports {
  const assetListConfig = useSelector(selectAssetListConfig)
  const relayersConfig = useSelector(selectRelayersConfig)

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

  return {
    getAssetsByChainId,
    getRelayerNameByChainId,
    getRelayerNameAndChainIdList,
  }
}
