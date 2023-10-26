import { contracts } from '@ixo/impactxclient-sdk/types/custom_queries/contract.constants'

type Environment = 'development' | 'testing' | 'production'

function getMulticallAddress(env: Environment): string | undefined {
  // Map the environment to the respective property name
  const envMap: Record<Environment, string> = {
    development: 'devnet',
    testing: 'testnet',
    production: 'mainnet',
  }

  // Find the multicall contract
  const multicallContract = contracts.find((contract) => contract.name === 'multicall')

  if (multicallContract && multicallContract.address) {
    return multicallContract.address[envMap[env]]
  }

  return undefined // Return undefined if the address isn't found
}

export const MULTI_CALL_CONTRACT_ADDRESS = process.env.NODE_ENV
  ? getMulticallAddress(process.env.NODE_ENV as Environment)
  : 'ixo1rrra808ggl30g27zdmp9ecc00u7le2tn5gunv86p8aa99jrc84qqk8dttm'
