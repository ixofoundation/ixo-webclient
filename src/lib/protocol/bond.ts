import { SigningStargateClient, ixo, cosmos } from '@ixo/impactxclient-sdk'
import {
  QueryBondResponse,
  QueryBuyPriceResponse,
  QueryCurrentPriceResponse,
  QueryCustomPriceResponse,
  QueryLastBatchResponse,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/query'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { fee, RPC_ENDPOINT } from './common'
import { Coin } from '@cosmjs/proto-signing'

const createRPCQueryClient = ixo.ClientFactory.createRPCQueryClient

export const Buy = async (
  client: SigningStargateClient,
  payload: {
    did: string
    address: string
    bondDid: string
    amount: Coin
    maxPrice: Coin
  },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, address, bondDid, amount, maxPrice } = payload
    const message = {
      typeUrl: '/ixo.bonds.v1beta1.MsgBuy',
      value: ixo.bonds.v1beta1.MsgBuy.fromPartial({
        buyerDid: did,
        buyerAddress: address,
        amount: cosmos.base.v1beta1.Coin.fromPartial(amount),
        maxPrices: [cosmos.base.v1beta1.Coin.fromPartial(maxPrice)],
        bondDid: bondDid,
      }),
    }

    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('Buy', e)
    return undefined
  }
}

export const WithdrawShare = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string },
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { did, bondDid, address } = payload
    const message = {
      typeUrl: '/ixo.bonds.v1beta1.MsgWithdrawShare',
      value: ixo.bonds.v1beta1.MsgWithdrawShare.fromPartial({
        recipientDid: did,
        bondDid: bondDid,
        recipientAddress: address,
      }),
    }
    console.info('WithdrawShare', message)
    const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('WithdrawShare', e)
    return undefined
  }
}

export const GetBondDetail = async (bondDid: string): Promise<QueryBondResponse | undefined> => {
  try {
    if (!RPC_ENDPOINT) {
      throw new Error('rpc endpoint is undefined')
    }
    if (!bondDid) {
      throw new Error('bondDid is undefined')
    }
    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
    const res: QueryBondResponse = await queryClient.ixo.bonds.v1beta1.bond({ bondDid })
    return res
  } catch (e) {
    console.error('GetBondDetail', e)
    return undefined
  }
}

export const GetCurrentPrice = async (bondDid: string): Promise<QueryCurrentPriceResponse | undefined> => {
  try {
    if (!RPC_ENDPOINT) {
      throw new Error('rpc endpoint is undefined')
    }
    if (!bondDid) {
      throw new Error('bondDid is undefined')
    }
    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
    const res: QueryCurrentPriceResponse = await queryClient.ixo.bonds.v1beta1.currentPrice({ bondDid })
    return res
  } catch (e) {
    console.error('GetCurrentPrice', e)
    return undefined
  }
}

export const GetBuyPrice = async (bondDid: string, bondAmount: string): Promise<QueryBuyPriceResponse | undefined> => {
  try {
    if (!RPC_ENDPOINT) {
      throw new Error('rpc endpoint is undefined')
    }
    if (!bondDid) {
      throw new Error('bondDid is undefined')
    }
    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
    const res: QueryBuyPriceResponse = await queryClient.ixo.bonds.v1beta1.buyPrice({ bondDid, bondAmount })
    return res
  } catch (e) {
    console.error('GetBuyPrice', e)
    return undefined
  }
}

export const GetCustomPrice = async (
  bondDid: string,
  bondAmount: string,
): Promise<QueryCustomPriceResponse | undefined> => {
  try {
    if (!RPC_ENDPOINT) {
      throw new Error('rpc endpoint is undefined')
    }
    if (!bondDid) {
      throw new Error('bondDid is undefined')
    }
    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
    const res: QueryCustomPriceResponse = await queryClient.ixo.bonds.v1beta1.customPrice({ bondDid, bondAmount })
    return res
  } catch (e) {
    console.error('GetCustomPrice', e)
    return undefined
  }
}

export const GetLastBatch = async (bondDid: string): Promise<QueryLastBatchResponse | undefined> => {
  try {
    if (!RPC_ENDPOINT) {
      throw new Error('rpc endpoint is undefined')
    }
    if (!bondDid) {
      throw new Error('bondDid is undefined')
    }
    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT })
    const res: QueryLastBatchResponse = await queryClient.ixo.bonds.v1beta1.lastBatch({ bondDid })
    return res
  } catch (e) {
    console.error('GetLastBatch', e)
    return undefined
  }
}
