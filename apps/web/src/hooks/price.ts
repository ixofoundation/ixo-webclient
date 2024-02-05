import { customQueries } from '@ixo/impactxclient-sdk'
import { GetTokenAsset } from 'lib/protocol'
import { useEffect, useState } from 'react'
import { IxoCoinCodexRelayerApi } from './configs'

export default function usePrice(denom: string) {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    ;(async () => {
      const token = await GetTokenAsset(denom)
      const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
        token.coinMinimalDenom,
        true,
        IxoCoinCodexRelayerApi,
      )

      setPrice(tokenInfo?.lastPriceUsd || 0)
    })()
  }, [denom])

  return price
}
