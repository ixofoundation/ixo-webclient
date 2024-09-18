import SwapAdapter, {
  SwapAdapterConstructorProps,
  SwapAdapterGenerateTransactionProps,
  SwapAdapterPerformSwapProps,
} from 'interfaces/swapAdapter'
import {
  cosmos,
  cosmwasm,
  createSigningClient,
} from '@ixo/impactxclient-sdk'
import { TRX_MSG } from 'types/transactions'
import { Uint8ArrayToJS, strToArray } from 'utils/encoding'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { getRandomTokenIds, queryTokenBalances, splitAmountOnRandomParts } from 'utils/swap'
import { RPC_ENDPOINT, fee } from 'lib/protocol'
import { StdFee } from '@cosmjs/stargate'
import { ExchangeAsset } from 'redux/exchange/exchange.types'
import * as store from 'store'
import { getQueryClient } from 'lib/queryClient'

enum IxoTokenSelect {
  Token2 = 'token2',
  Token1155 = 'token1155',
}

type ObjectMap = {
  [key: string]: string
}

export type TokenAmount = {
  [key in AmountType]?: string | ObjectMap
}

export enum AmountType {
  Single = 'single',
  Multiple = 'multiple',
}

class IxoSwapAdapter implements SwapAdapter {
  walletAddress: string
  smartContractAddress: string
  impactContractAddress: string
  rpcEndpoint: string
  fee: StdFee
  offlineSigner: any

  constructor({ walletAddress, offlineSigner }: SwapAdapterConstructorProps) {
    this.walletAddress = walletAddress 
    this.smartContractAddress = 'ixo1p5nwq2ut6344qwlvjv42ayqhvarl46lnqfmnrgjnh2cwahl54g2qpg4y8y'
    this.impactContractAddress = 'ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c'
    this.rpcEndpoint = RPC_ENDPOINT as string
    this.offlineSigner = offlineSigner
    this.fee = fee
  }

  private transformTokenStandard(token?: any): IxoTokenSelect {
    return (token as any) === 'carbon' ? IxoTokenSelect.Token1155 : IxoTokenSelect.Token2
  }

  private generateCoins(denoms: string[], amounts: string[]): Coin[] {
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

  private useBaseDenomAmount = (inputAsset: ExchangeAsset) => {
    const denomUnit = inputAsset.asset?.denomUnits?.find(
      (item: any) => item.denom.toLowerCase() === inputAsset.asset?.base?.toLowerCase(),
    )
    return inputAsset.amount.times(Math.pow(10, denomUnit?.exponent || 0))
  }

  private useSmallestUnit = (outputAsset: ExchangeAsset) => {
    const denomUnit = outputAsset.asset?.denomUnits?.find(
      (item: any) => item.denom.toLowerCase() === outputAsset.asset?.base?.toLowerCase(),
    )
    return outputAsset.amount.dividedBy(Math.pow(10, denomUnit?.exponent || 0))
  }

  approvedForAll(address: string) {
    return JSON.stringify({
      approved_for_all: {
        owner: address,
      },
    })
  }

  approveAll() {
    return JSON.stringify({
      approve_all: {
        operator: this.smartContractAddress,
      },
    })
  }

  async querySmartContract(msg: string) {
    const queryClient = await getQueryClient()
    try {
      return await queryClient.cosmwasm.wasm.v1
        .smartContractState({
          address: this.impactContractAddress,
          queryData: strToArray(msg),
        })
        .then((response) => JSON.parse(Uint8ArrayToJS(response.data)))
    } catch (error) {
      console.log('querySmartContract error', { msg, error })
    }
  }

  async checkIfNeedToApprove() {
    const approvedForAll = this.approvedForAll(this.walletAddress)
    const response = await this.querySmartContract(approvedForAll)

    if (response) {
      const approve_all = this.approveAll()

      const message = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
          contract: this.impactContractAddress,
          funds: [
            cosmos.base.v1beta1.Coin.fromPartial({
              amount: '1',
              denom: 'uixo',
            }),
          ],
          msg: strToArray(approve_all),
          sender: this.walletAddress,
        }),
      }

      return message
    }
    return null
  }

  async getTokens() {
    const queryClient = await getQueryClient()
    const tokenBalances = await queryTokenBalances(queryClient, 'devnet-1', this.walletAddress)
    return tokenBalances[0]
  }

  ixoToCarbonMsg({ inputAsset, outputAsset }: SwapAdapterGenerateTransactionProps) {
    const inputAmount = this.useBaseDenomAmount(inputAsset)

    return {
      swap: {
        input_token: 'token2',
        input_amount: { single: inputAmount.toString() },
        min_output: {
          single: outputAsset.amount.toFixed(),
        },
      },
    }
  }

  async CarbonToIxo({ inputAsset, outputAsset }: SwapAdapterGenerateTransactionProps) {
    return this.getTokens().then(async (response) => {
      const tokenIds: string[] = Array.from((response as any)?.batches?.keys() || [])
      const includedBatchesCount = Math.floor(Math.random() * tokenIds.length) + 1

      const batchesAmounts = splitAmountOnRandomParts(inputAsset.amount.toNumber(), includedBatchesCount)
      const batchesIds = getRandomTokenIds(tokenIds, includedBatchesCount)

      const inputAmount = {
        multiple: {
          ...batchesIds.reduce((acc, id, index) => {
            acc[id] = batchesAmounts[index].toString()
            return acc
          }, {}),
        },
      }

      const convertedAmount = outputAsset.amount.times(1000000)
      const outPutAmountWithSlippage = convertedAmount.minus(convertedAmount.times(3 / 100)).toFixed(0)

      return {
        swap: {
          input_token: 'token1155',
          input_amount: inputAmount,
          min_output: {
            single: outPutAmountWithSlippage.toString(),
          },
        },
      }
    })
  }

  async generateSwapTransaction({ inputAsset, outputAsset }: SwapAdapterGenerateTransactionProps): Promise<TRX_MSG> {
    const inputToken = this.transformTokenStandard(inputAsset.asset?.base)
    const inputTokenCondition = inputToken === IxoTokenSelect.Token2
    let msg
    if (inputTokenCondition) {
      msg = this.ixoToCarbonMsg({ inputAsset, outputAsset })
    } else {
      msg = await this.CarbonToIxo({ inputAsset, outputAsset })
    }

    const funds: any = inputTokenCondition
      ? new Map<string, string>([['uixo', this.useBaseDenomAmount(inputAsset).toString()]])
      : undefined

    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
        contract: this.smartContractAddress,
        msg: strToArray(JSON.stringify(msg)),
        sender: this.walletAddress,
        funds: funds && this.generateCoins(Array.from(funds.keys()), Array.from(funds.values())),
      }),
    }
  }

  async executeWasmTRX({
    offlineSigner = this.offlineSigner,
    swapTrxs,
    callback,
  }: SwapAdapterPerformSwapProps): Promise<unknown> {
    return await createSigningClient(
      RPC_ENDPOINT!,
      offlineSigner,
      false,
      {},
      {
        getLocalData: (k) => store.get(k),
        setLocalData: (k, d) => store.set(k, d),
      },
    ).then((client) => {
      client.signAndBroadcast(this.walletAddress, swapTrxs as any, this.fee).finally(callback)
    })
  }
}

export default IxoSwapAdapter
