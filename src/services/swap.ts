import { cosmos, cosmwasm } from '@ixo/impactxclient-sdk'
import { TxResponse } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/abci/v1beta1/abci'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

import { TRX_FEE, TRX_FEE_OPTION, TRX_MSG } from 'types/transactions'

import { TokenAmount, TokenSelect } from 'types/swap'
import { strToArray } from 'utils/encoding'

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

export const generateBankSendTrx = ({
  fromAddress,
  toAddress,
  denom,
  amount,
}: {
  fromAddress: string
  toAddress: string
  denom: string
  amount: string
}): TRX_MSG => ({
  typeUrl: '/cosmos.bank.v1beta1.MsgSend',
  value: cosmos.bank.v1beta1.MsgSend.fromPartial({
    fromAddress,
    toAddress,
    amount: [cosmos.base.v1beta1.Coin.fromPartial({ amount, denom })],
  }),
})
export const generateBankMultiSendTrx = ({
  fromAddress,
  toAddresses,
  amounts,
  denoms,
}: {
  fromAddress: string
  toAddresses: string[]
  denoms: string[]
  amounts: string[]
}): TRX_MSG => ({
  typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
  value: cosmos.bank.v1beta1.MsgMultiSend.fromPartial({
    inputs: [
      {
        address: fromAddress,
        coins: generateCoins(denoms, amounts),
      },
    ],
    outputs: toAddresses.map((address, index) => ({
      address: address,
      coins: [
        cosmos.base.v1beta1.Coin.fromPartial({
          amount: amounts[index],
          denom: denoms[index],
        }),
      ],
    })),
  }),
})

export const generateDelegateTrx = ({
  delegatorAddress,
  validatorAddress,
  denom,
  amount,
}: {
  delegatorAddress: string
  validatorAddress: string
  denom: string
  amount: string
}): TRX_MSG => ({
  typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
  value: cosmos.staking.v1beta1.MsgDelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount, denom }),
  }),
})

export const generateUndelegateTrx = ({
  delegatorAddress,
  validatorAddress,
  denom,
  amount,
}: {
  delegatorAddress: string
  validatorAddress: string
  denom: string
  amount: string
}): TRX_MSG => ({
  typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
  value: cosmos.staking.v1beta1.MsgUndelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount, denom }),
  }),
})

export const generateRedelegateTrx = ({
  delegatorAddress,
  validatorSrcAddress,
  validatorDstAddress,
  denom,
  amount,
}: {
  delegatorAddress: string
  validatorSrcAddress: string
  validatorDstAddress: string
  denom: string
  amount: string
}): TRX_MSG => ({
  typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  value: cosmos.staking.v1beta1.MsgBeginRedelegate.fromPartial({
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount, denom }),
  }),
})

export const generateWithdrawRewardTrx = ({
  delegatorAddress,
  validatorAddress,
}: {
  delegatorAddress: string
  validatorAddress: string
}): TRX_MSG => ({
  typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  value: cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.fromPartial({
    delegatorAddress,
    validatorAddress,
  }),
})

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
  funds: Map<string, string>
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
    funds: generateCoins(Array.from(funds.keys()), Array.from(funds.values())),
  }),
})

export const getValueFromTrxEvents = (trxRes: TxResponse, event: string, attribute: string, messageIndex = 0) =>
  JSON.parse(trxRes?.rawLog!)
    [messageIndex]['events'].find((e: any) => e.type === event)
    ['attributes'].find((e: any) => e.key === attribute)['value']
