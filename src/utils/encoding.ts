import BigNumber from 'bignumber.js'

export const strToArray = (str: string): Uint8Array => {
  return new Uint8Array(Buffer.from(str))
}

export const getMicroAmount = (amount: string, decimals: number = 6): string => {
  return new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString()
}
