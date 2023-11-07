import { customQueries } from '@ixo/impactxclient-sdk'
import { ChainNetwork } from '@ixo/impactxclient-sdk/types/custom_queries/chain.types'

type Environment = 'development' | 'testing' | 'production'

function getMulticallAddress(env: Environment): string | undefined {
  // Map the environment to the respective property name
  const envMap: Record<Environment, ChainNetwork> = {
    development: 'devnet',
    testing: 'testnet',
    production: 'mainnet',
  }

  // Find the multicall contract
  const multicallContract = customQueries.contract.getContractAddress(envMap[env], 'multicall')

  return multicallContract
}

export const MULTI_CALL_CONTRACT_ADDRESS =
  getMulticallAddress(process.env.NODE_ENV as Environment) ??
  'ixo1rrra808ggl30g27zdmp9ecc00u7le2tn5gunv86p8aa99jrc84qqk8dttm'
