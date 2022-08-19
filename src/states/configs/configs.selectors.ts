import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { AssetListConfig, ConfigsState } from './configs.types'

export const selectConfigs = (state: RootState): ConfigsState => state.configs

export const selectAssetList = createSelector(
  selectConfigs,
  (configs: ConfigsState): AssetListConfig[] => configs.assetListConfig,
)
