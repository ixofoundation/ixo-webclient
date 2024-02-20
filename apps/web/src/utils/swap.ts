import { pools, tokens } from 'constants/pools'
import { TokenAmount, TokenSelect, TokenType } from 'types/swap'
import { CURRENCY_TOKEN } from 'types/wallet'
import { Uint8ArrayToJS, getMicroAmount, strToArray } from './encoding'
import { GetBalances } from 'lib/protocol'
import { findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'
import { SupportedDenoms, SupportedStandards } from 'hooks/exchange'
import { getQueryClient } from 'lib/queryClient'

export const getInputTokenAmount = (
  token: CURRENCY_TOKEN,
  tokenSelect: TokenSelect,
  tokenAmount: string,
): TokenAmount => {
  if (tokenSelect === TokenSelect.Token1155 && token.batches) {
    let totalInputAmountRest = Number(tokenAmount)
    const inputTokenBatches = new Map<string, string>()
    for (const [tokenId, amount] of token.batches) {
      const tokenAmount = Number(amount)

      if (tokenAmount) {
        if (tokenAmount > totalInputAmountRest) {
          inputTokenBatches.set(tokenId, totalInputAmountRest.toString())
          totalInputAmountRest = 0
        } else {
          inputTokenBatches.set(tokenId, amount)
          totalInputAmountRest -= tokenAmount
        }
      }

      if (!totalInputAmountRest) break
    }

    return { multiple: Object.fromEntries(inputTokenBatches) }
  } else {
    return { single: getMicroAmount(tokenAmount) }
  }
}
export const getOutputTokenAmount = (tokenSelect: TokenSelect, tokenAmount: string, slippage: number): TokenAmount => {
  const outputAmountNumber =
    tokenSelect === TokenSelect.Token1155
      ? Number.parseFloat(tokenAmount)
      : Number.parseFloat(getMicroAmount(tokenAmount))
  const outPutAmountWithSlippage = outputAmountNumber - outputAmountNumber * (slippage / 100)

  return { single: outPutAmountWithSlippage.toFixed() }
}

export const getSwapTokens = (walletTokens: CURRENCY_TOKEN[]): CURRENCY_TOKEN[] =>
  walletTokens.filter((token) => tokens.has(token.denom))
export const getSwapContractAddress = (inputDenom: string, outputDenom: string): string =>
  getTokenSelectByDenom(inputDenom) === TokenSelect.Token1155
    ? pools.get({ token1155: inputDenom, token2: outputDenom })
    : pools.get({ token1155: outputDenom, token2: inputDenom })
export const getSwapFunds = (inputTokenDenom: string, inputAmount: string): Map<string, string> => {
  const funds = new Map<string, string>()
  if (getTokenTypeByDenom(inputTokenDenom) === TokenType.Native) {
    funds.set(inputTokenDenom, getMicroAmount(inputAmount))
  }

  return funds
}

export const getTokenSelectByDenom = (denom: string): TokenSelect =>
  getTokenTypeByDenom(denom) === TokenType.Cw1155 ? TokenSelect.Token1155 : TokenSelect.Token2
export const getTokenTypeByDenom = (denom: string): TokenType => tokens.get(denom)?.type as TokenType
export const isCw1155Token = (denom: string) => getTokenTypeByDenom(denom) === TokenType.Cw1155

export const queryOutputAmount = async (
  inputTokenType: TokenType,
  inputTokenAmount: TokenAmount,
  swapContractAddress: string,
) => {
  const queryClient = await getQueryClient
  let query = {}
  if (inputTokenType === TokenType.Token1155) {
    query = {
      token1155_for_token2_price: {
        token1155_amount: inputTokenAmount,
      },
    }
  } else {
    query = {
      token2_for_token1155_price: {
        token2_amount: inputTokenAmount,
      },
    }
  }

  const response = await queryClient.cosmwasm.wasm.v1.smartContractState({
    address: swapContractAddress,
    queryData: strToArray(JSON.stringify(query)),
  })
  const parsedResponse = JSON.parse(Uint8ArrayToJS(response.data))

  console.log({parsedResponse})

  return Number(parsedResponse.token2_amount ?? parsedResponse.token1155_amount)
}
export const splitAmountOnRandomParts = (amount: number, parts: number, min = 100): number[] => {
  const randomBit = amount - min * parts
  const result: number[] = []

  for (let i = 0; i < parts; i++) {
    result.push(Math.random())
  }

  const multiplier = randomBit / result.reduce((prev, curr) => prev + curr)
  return result.map((amount) => Math.round(amount * multiplier + min))
}
export const getRandomTokenIds = (tokenIds: string[], idsCount: number): string[] =>
  tokenIds.sort(() => 0.5 - Math.random()).slice(0, idsCount)

export const formatOutputAmount = (
  inputTokenType: TokenSelect,
  outputTokenIds: string[],
  outputAmount: number,
  includeBatches = true,
): TokenAmount => {
  if (inputTokenType === TokenSelect.Token1155) {
    return {
      single: outputAmount.toFixed(),
    }
  } else {
    const anyBatches = Math.random() < 0.5

    if (!includeBatches) {
      return {
        single: outputAmount.toFixed(),
      }
    }

    if (anyBatches) {
      return {
        single: outputAmount.toFixed(),
      }
    } else {
      const includedBatchesCount = Math.floor(Math.random() * outputTokenIds.length) + 1
      const batchesAmounts = splitAmountOnRandomParts(Number(outputAmount.toFixed()), includedBatchesCount)
      const batchesIds = getRandomTokenIds(outputTokenIds, includedBatchesCount)

      return {
        multiple: {
          ...batchesIds.reduce((acc, id, index) => {
            acc[id] = batchesAmounts[index].toString()
            return acc
          }, {}),
        },
      }
    }
  }
}

export const queryTokenBalances = async (
  queryClientArg: Awaited<typeof getQueryClient>,
  chain: string,
  address: string,
): Promise<CURRENCY_TOKEN[]> => {
  try {
    const balances: CURRENCY_TOKEN[] = []
    const batches: Map<string, string> = new Map()
    for (const [denom, token] of tokens) {
      switch (token.type) {
        case TokenType.Cw1155: {
          const ownerTokensQuery = { tokens: { owner: address } }
          const ownerTokensResponse = await queryClientArg.cosmwasm.wasm.v1.smartContractState({
            address: token.address!,
            queryData: strToArray(JSON.stringify(ownerTokensQuery)),
          })
          const ownerTokenIds: string[] = ownerTokensResponse?.data
            ? JSON.parse(Uint8ArrayToJS(ownerTokensResponse.data)).tokens
            : []

          const ownerBalancesQuery = {
            batch_balance: {
              owner: address,
              token_ids: ownerTokenIds,
            },
          }
          const ownerBalancesResponse = await queryClientArg.cosmwasm.wasm.v1.smartContractState({
            address: token.address!,
            queryData: strToArray(JSON.stringify(ownerBalancesQuery)),
          })
          const ownerBalances = ownerBalancesResponse?.data
            ? JSON.parse(Uint8ArrayToJS(ownerBalancesResponse.data)).balances
            : []
          const totalBalance = ownerBalances?.reduce(
            (prev: string, current: string) => Number(prev) + Number(current),
            0,
          )

          for (const [index, tokenId] of ownerTokenIds.entries()) {
            batches.set(tokenId, ownerBalances[index].toString())
          }

          balances.push({ denom, amount: totalBalance.toString(), batches, ibc: false, chain })
          break
        }
        case TokenType.Cw20: {
          const query = { balance: { address } }
          const response = await queryClientArg.cosmwasm.wasm.v1.smartContractState({
            address: token.address!,
            queryData: strToArray(JSON.stringify(query)),
          })

          balances.push({ denom, amount: JSON.parse(Uint8ArrayToJS(response.data)).balance, ibc: false, chain })
          break
        }
      }
    }

    return balances
  } catch (error) {
    console.error('queryTokenBalances::', error)
    return []
  }
}

export const getTokenBalances = async ({ accountAddress }: { accountAddress: string }) => {
  const bankBalances = await GetBalances(accountAddress)
  const queryClient = await getQueryClient
  const tokenBalances = await queryTokenBalances(queryClient, 'devnet-1', accountAddress).then((response) =>
    response ? response : [],
  )

  console.log({ tokenBalances })

  const balances = [...bankBalances, ...tokenBalances].map(({ denom, amount, batches }: any) => ({
    denom: findDenomByMinimalDenom(denom),
    amount: minimalAmountToAmount(denom, amount),
    batches: batches || [],
  }))

  return balances
}

export const getTokenTypeFromDenom = (denom: SupportedDenoms): SupportedStandards | undefined => {
  const tokenTypes = new Map<SupportedDenoms, SupportedStandards>()

  tokenTypes.set('uixo', '20')
  tokenTypes.set('carbon', '1155')

  return tokenTypes.get(denom)
}
