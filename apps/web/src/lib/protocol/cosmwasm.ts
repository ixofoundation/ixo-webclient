import { cosmos, cosmwasm, SigningStargateClient, utils } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import Long from 'long'
import { fee, TSigner } from './common'

export const WasmInstantiateTrx = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: { codeId: number; msg: string }[],
) => {
  try {
    const { address, did } = signer
    const messages = payload.map(({ codeId, msg }) => ({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: cosmwasm.wasm.v1.MsgInstantiateContract.fromPartial({
        admin: address,
        codeId: Long.fromNumber(codeId),
        funds: [
          cosmos.base.v1beta1.Coin.fromPartial({
            amount: '1',
            denom: 'uixo',
          }),
        ],
        label: did + 'contract' + codeId,
        msg: utils.conversions.JsonToArray(msg),
        sender: address,
      }),
    }))

    const updatedFee = { ...fee, gas: new BigNumber(fee.gas).times(messages.length).toString() }
    const response = await client.signAndBroadcast(address, messages, updatedFee)
    return response
  } catch (e) {
    console.error('WasmInstantiateTrx', e)
    return undefined
  }
}

export const WasmExecuteTrx = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: { contractAddress: string; msg: string },
  funds = {
    amount: '1',
    denom: 'uixo',
  },
) => {
  try {
    const { address } = signer
    const { contractAddress, msg } = payload
    const message = {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: cosmwasm.wasm.v1.MsgExecuteContract.fromPartial({
        contract: contractAddress,
        funds: funds ? [cosmos.base.v1beta1.Coin.fromPartial(funds)] : [],
        msg: utils.conversions.JsonToArray(msg),
        sender: address,
      }),
    }

    const response = await client.signAndBroadcast(address, [message], fee)
    return response
  } catch (e) {
    console.error('WasmExecuteTrx', e)
    return undefined
  }
}
