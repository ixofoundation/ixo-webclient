import { customQueries } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'
import { GetTokenAsset } from 'lib/protocol'
import { TTreasuryCoinModel } from 'screens/CurrentEntity/Treasury/DAOTreasury/Accounts'
import { getDisplayAmount } from './currency'
import { Coin } from '@cosmjs/proto-signing'

export function getTotalUSDvalueFromTreasuryCoins(coins: { [denom: string]: TTreasuryCoinModel }): string {
  return (
    Object.values(coins).reduce(
      (pre, cur) =>
        new BigNumber(pre)
          .plus(new BigNumber(cur?.balance ?? '0').times(new BigNumber(cur?.lastPriceUsd ?? '0')))
          .toFixed(),
      '0',
    ) ?? '0'
  )
}

export async function getTreasuryCoinByDenom(
  address: string,
  coin: Coin,
  rpc: string,
): Promise<TTreasuryCoinModel | undefined> {
  const { denom, amount } = coin
  const token = await GetTokenAsset(denom, rpc)
  const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
    token.coinMinimalDenom,
    true,
    IxoCoinCodexRelayerApi,
  )
  if (!tokenInfo) {
    return undefined
  }
  const { coinName, lastPriceUsd } = tokenInfo
  const payload: TTreasuryCoinModel = {
    address,
    balance: getDisplayAmount(amount, token.coinDecimals),
    network: `${coinName.toUpperCase()}`,
    coinDenom: token.coinDenom,
    coinImageUrl: token.coinImageUrl!,
    lastPriceUsd,
  }
  return payload
}

export function mergeBalances(data: TTreasuryCoinModel[]) {
  if (data.length === 0) return data

  const merged = {}

  data.forEach((item) => {
    if (!merged[item.coinDenom]) {
      merged[item.coinDenom] = { ...item, balance: parseFloat(item.balance) }
    } else {
      merged[item.coinDenom].balance += parseFloat(item.balance)
    }
  })

  return Object.values(merged)
}
