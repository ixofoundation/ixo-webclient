import { useEffect } from 'react'
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { RPC_ENDPOINT } from 'lib/protocol'
import { useAccount } from 'hooks/account'

export const InitCosmWasmClient = () => {
  const { updateCWClient } = useAccount()

  useEffect(() => {
    CosmWasmClient.connect(RPC_ENDPOINT!).then(updateCWClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
