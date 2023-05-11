import { fromBech32 } from '@cosmjs/encoding'

export const isIxoAccount = (address: string): boolean => {
  return address.startsWith('ixo')
}

export const determineNetworkByAddress = (address: string): string => {
  const { prefix } = fromBech32(address)
  return prefix
}
