import { cosmos, cosmwasm } from '@ixo/impactxclient-sdk'
import { TxResponse } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/abci/v1beta1/abci'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

import { TRX_FEE, TRX_FEE_OPTION, TRX_MSG } from 'types/transactions'

import { TokenAmount, TokenSelect } from 'types/swap'
import { strToArray } from 'utils/encoding'
import { DexAsset, calculateBaseAmount, calculateBaseDenomAmount } from 'hooks/exchange'
import { formatInputAmount, formatOutputAmount, getTokenTypeFromDenom } from 'utils/swap'

export const defaultTrxFeeOption: TRX_FEE_OPTION = 'average'

export const defaultTrxFee: TRX_FEE = {
  amount: [{ amount: String(5000), denom: 'uixo' }],
  gas: String(300000),
}

const generateCoins = (denoms: string[], amounts: string[]): Coin[] => {
  const coinMap: Record<string, number> = {}
  for (let i = 0; i < denoms!.length; i++) {
    const denom = denoms![i]
    const amount = parseInt(amounts![i])
    if (coinMap[denom!]) {
      coinMap[denom!] += amount
    } else {
      coinMap[denom] = amount
    }
  }
  const coins: Coin[] = []
  for (const [denom, amount] of Object.entries(coinMap)) {
    coins.push(cosmos.base.v1beta1.Coin.fromPartial({ denom, amount: amount.toString() }))
  }

  return coins
}

export const generateSwapTrx = ({
  contractAddress,
  senderAddress,
  inputTokenSelect,
  inputTokenAmount,
  outputTokenAmount,
  funds,
}: {
  contractAddress: string
  senderAddress: string
  inputTokenSelect: TokenSelect
  inputTokenAmount: TokenAmount
  outputTokenAmount: TokenAmount
  funds?: Map<string, string>
}): TRX_MSG => ({
  typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
  value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
    contract: contractAddress,
    msg: strToArray(
      JSON.stringify({
        swap: {
          input_token: inputTokenSelect,
          input_amount: inputTokenAmount,
          min_output: outputTokenAmount,
        },
      }),
    ),
    sender: senderAddress,
    funds: funds ? generateCoins(Array.from(funds.keys()), Array.from(funds.values())) : [],
  }),
})

export const getValueFromTrxEvents = (trxRes: TxResponse, event: string, attribute: string, messageIndex = 0) =>
  JSON.parse(trxRes?.rawLog!)
    [messageIndex]['events'].find((e: any) => e.type === event)
    ['attributes'].find((e: any) => e.key === attribute)['value']

export const orchestrateSwapTransaction = ({
  inputAsset,
  outputAsset,
  tokenBalances,
  slippage,
  address,
}: {
  inputAsset: DexAsset
  outputAsset: DexAsset
  tokenBalances: any
  slippage: number
  address: string
}) => {
  const tokenPair = `${inputAsset.denom?.toLowerCase()}-${outputAsset.denom?.toLowerCase()}`

  switch (tokenPair) {
    case 'uixo-carbon':
    case 'carbon-uixo':
      if (inputAsset.denom) {
        console.log('properTokenPairSelected')
        const contractAddress = 'ixo17srjznxl9dvzdkpwpw24gg668wc73val88a6m5ajg6ankwvz9wtsek9x34'
        const inputToken =
          getTokenTypeFromDenom(inputAsset.denom) === '1155' ? TokenSelect.Token1155 : TokenSelect.Token2

        console.log({ inputToken })
        const tokenIds: Map<string, string> =
          inputToken === TokenSelect.Token1155
            ? tokenBalances.find((item: any) => item.denom.toLowerCase() === 'carbon').batches
            : new Map()

        const baseUnitAmount =
          inputToken === TokenSelect.Token1155
            ? inputAsset.amount.toNumber()
            : calculateBaseAmount(inputAsset.amount, 6).toNumber()

        console.log({ tokenIds })

        const formattedInputAmount = formatInputAmount(inputToken, baseUnitAmount, Array.from(tokenIds.keys()))

        const outputAmountWithSlippage = outputAsset.amount.minus(outputAsset.amount.times(slippage / 100)).toNumber()

        const formattedOutputAmount = formatOutputAmount(
          inputToken,
          Array.from(tokenIds.keys()),
          outputAmountWithSlippage,
          false,
        )

        const funds: any =
          inputToken === TokenSelect.Token2
            ? new Map<string, string>([
                // Specify the funds (Token2 tokens) you want to send
                ['uixo', baseUnitAmount.toString()], // Adjust the token type and amount as needed
              ])
            : undefined

        console.log({
          contractAddress,
          senderAddress: address,
          inputTokenAmount: formattedInputAmount,
          inputTokenSelect: inputToken,
          outputTokenAmount: { single: '0' },
          funds,
        })

        return generateSwapTrx({
          contractAddress,
          senderAddress: address,
          inputTokenAmount: formattedInputAmount,
          inputTokenSelect: inputToken,
          outputTokenAmount: formattedOutputAmount,
          funds,
        })
      }
      break
    default:
      break
  }
}
