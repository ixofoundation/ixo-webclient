import { useIxoConfigs } from 'hooks/configs'
import React, { useEffect } from 'react'

const ConfigService: React.FC = (): null => {
  const { fetchRelayersConfig, fetchAssetListConfig, fetchExchangeConfig, fetchEntityConfig } = useIxoConfigs()

  useEffect(() => {
    fetchRelayersConfig()
    fetchAssetListConfig()
    fetchExchangeConfig()
    fetchEntityConfig()
  }, [fetchRelayersConfig, fetchAssetListConfig, fetchExchangeConfig, fetchEntityConfig])

  return null
}

export default ConfigService
