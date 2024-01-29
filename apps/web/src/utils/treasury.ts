import BigNumber from 'bignumber.js'
import { TTreasuryCoinModel } from 'pages/CurrentEntity/Treasury/DAOTreasury/Accounts'

export function getTotalUSDvalueFromTreasuryCoins(coins: { [denom: string]: TTreasuryCoinModel }): string {
  return (
    Object.values(coins).reduce(
      (pre, cur) =>
        new BigNumber(pre).plus(new BigNumber(cur.balance).times(new BigNumber(cur.lastPriceUsd))).toFixed(),
      '0',
    ) ?? '0'
  )
}
