export interface AssetListConfig {
  chainId: string
  assets: {
    symbol: string
    description: string
    display: string
    entityId: string
    assetType: string
    base: string
    denomUnits: {
      denom: string
      exponent: number
      aliases: string[]
    }
    logoURIs: {
      png: string
      svg: string
      zlottie: string
    }
    isStakeCurrency: boolean
    isFeeCurrency: boolean
    isBondToken: boolean
    coingeckoId: string
  }[]
}

export interface ConfigsState {
  assetListConfig: AssetListConfig[]
}

export enum ConfigsStateActions {
  GetAssetListConfig = 'ixo/configs/GET_ASSETLIST_CONFIG',
  GetAssetListConfigSuccess = 'ixo/configs/GET_ASSETLIST_CONFIG_FULFILLED',
}

export interface GetAssetListConfigAction {
  type: typeof ConfigsStateActions.GetAssetListConfig
  payload: Promise<AssetListConfig[]>
}
export interface GetAssetListConfigSuccessAction {
  type: typeof ConfigsStateActions.GetAssetListConfigSuccess
  payload: AssetListConfig[]
}

export type ConfigsStateActionTypes =
  | GetAssetListConfigAction
  | GetAssetListConfigSuccessAction
