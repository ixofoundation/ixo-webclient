import BigNumber from 'bignumber.js'

export const calcToAmount = (
  fromAmount: BigNumber,
  fromUSDRate: number,
  toUSDRate: number,
): BigNumber => {
  return (
    new BigNumber(fromAmount)
      .multipliedBy(new BigNumber(fromUSDRate))
      .dividedBy(new BigNumber(toUSDRate)) ?? new BigNumber(0)
  )
}
