import { SigningStargateClient, ixo, cosmos } from '@ixo/impactxclient-sdk'
import {
  QueryBondResponse,
  QueryBuyPriceResponse,
  QueryCurrentPriceResponse,
  QueryCustomPriceResponse,
  QueryLastBatchResponse,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/query'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { fee, RPC_ENDPOINT, TSigner } from './common'
import { Coin } from '@cosmjs/proto-signing'
import { MsgCreateBond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/tx'
import { BondStateType } from 'redux/bond/bond.types'

const createRPCQueryClient = ixo.ClientFactory.createRPCQueryClient

export const CreateBondMessage = async (
  payload: MsgCreateBond,
) => {
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgCreateBond',
    value: ixo.bonds.v1beta1.MsgCreateBond.fromPartial(payload),
  }
  return { messages: [message], fee}
}

export const Buy = async (
  client: SigningStargateClient,
  payload: {
    did: string
    address: string
    bondDid: string
    amount: Coin
    maxPrice: Coin
  },
): Promise<DeliverTxResponse> => {
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

  console.log('Bond.Buy', { message })
  const response = await client.signAndBroadcast(address, [message], fee)
  console.log('Bond.Buy', { response })
  return response
}

export const WithdrawShare = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string },
): Promise<DeliverTxResponse> => {
  const { did, bondDid, address } = payload
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgWithdrawShare',
    value: ixo.bonds.v1beta1.MsgWithdrawShare.fromPartial({
      recipientDid: did,
      bondDid: bondDid,
      recipientAddress: address,
    }),
  }
  console.info('WithdrawShare', { message })
  const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
  console.info('WithdrawShare', { response })
  return response
}

export const MakeOutcomePayment = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string; amount: string },
): Promise<DeliverTxResponse> => {
  const { did, bondDid, address, amount } = payload
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgMakeOutcomePayment',
    value: ixo.bonds.v1beta1.MsgMakeOutcomePayment.fromPartial({
      senderDid: did,
      bondDid: bondDid,
      senderAddress: address,
      amount: amount,
    }),
  }
  console.info('MakeOutcomePayment', { message })
  const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
  console.info('MakeOutcomePayment', { response })
  return response
}

export const WithdrawReserve = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string; amount: Coin },
): Promise<DeliverTxResponse> => {
  const { did, bondDid, address, amount } = payload
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgWithdrawReserve',
    value: ixo.bonds.v1beta1.MsgWithdrawReserve.fromPartial({
      withdrawerDid: did,
      bondDid: bondDid,
      withdrawerAddress: address,
      amount: [cosmos.base.v1beta1.Coin.fromPartial(amount)],
    }),
  }
  console.info('WithdrawReserve', { message })
  const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
  console.info('WithdrawReserve', { response })
  return response
}

export const UpdateBondState = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string; state: BondStateType },
): Promise<DeliverTxResponse> => {
  const { did, bondDid, address, state } = payload
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgUpdateBondState',
    value: ixo.bonds.v1beta1.MsgUpdateBondState.fromPartial({
      editorDid: did,
      bondDid: bondDid,
      editorAddress: address,
      state: state,
    }),
  }
  console.info('UpdateBondState', { message })
  const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
  console.info('UpdateBondState', { response })
  return response
}

/**
 *
 * @param client
 * @param payload alpha: string = "520000000000000000"
 * @returns
 */
export const SetNextAlpha = async (
  client: SigningStargateClient,
  payload: { did: string; bondDid: string; address: string; alpha: string },
): Promise<DeliverTxResponse> => {
  const { did, bondDid, address, alpha } = payload
  const message = {
    typeUrl: '/ixo.bonds.v1beta1.MsgSetNextAlpha',
    value: ixo.bonds.v1beta1.MsgSetNextAlpha.fromPartial({
      oracleDid: did,
      oracleAddress: address,
      bondDid: bondDid,
      delta: '',
      alpha: alpha,
    }),
  }
  console.info('SetNextAlpha', { message })
  const response: DeliverTxResponse = await client.signAndBroadcast(address, [message], fee)
  console.info('SetNextAlpha', { response })
  return response
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
