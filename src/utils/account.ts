import { fromBech32 } from '@cosmjs/encoding'
import { KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain'
import { getChainNameFromAddressPrefix, getKeplrChainInfo } from '@ixo/cosmos-chain-resolver'
import { chainNetwork } from 'hooks/configs'

export const isIxoAccount = (address: string): boolean => {
  return address.startsWith('ixo')
}

export const getPrefixFromAddress = (address: string): string => {
  const { prefix } = fromBech32(address)
  return prefix
}

export const determineChainFromAddress = async (address: string): Promise<KeplrChainInfo> => {
  const prefix: string = getPrefixFromAddress(address)
  const chainName: string = getChainNameFromAddressPrefix(prefix)
  const chainInfo: KeplrChainInfo = await getKeplrChainInfo(
    chainName,
    chainName === 'impacthub' ? chainNetwork : undefined,
  )
  return chainInfo
}
