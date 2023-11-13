import { customQueries } from '@ixo/impactxclient-sdk'
import { ChainNetwork } from '@ixo/impactxclient-sdk/types/custom_queries/chain.types'

type Environment = 'development' | 'testing' | 'production'

function getEnvironmentFromRPCURL(rpcUrl: string | undefined): Environment {
  if (rpcUrl?.includes('devnet-1')) {
    return 'development'
  } else if (rpcUrl?.includes('pandora-8')) {
    return 'testing'
  } else if (rpcUrl?.includes('ixo-5')) {
    return 'production'
  }
  throw new Error('Invalid RPC URL')
}

function getMulticallAddress(rpcUrl?: string): string {
  const env = getEnvironmentFromRPCURL(rpcUrl)

  const envMap: Record<Environment, ChainNetwork> = {
    development: 'devnet',
    testing: 'testnet',
    production: 'mainnet',
  }

  const multicallContract = customQueries.contract.getContractAddress(envMap[env], 'multicall')

  return multicallContract.length > 0
    ? multicallContract
    : 'ixo1rrra808ggl30g27zdmp9ecc00u7le2tn5gunv86p8aa99jrc84qqk8dttm'
}

export const MULTI_CALL_CONTRACT_ADDRESS = getMulticallAddress(process.env.REACT_APP_CHAIN_ID)
