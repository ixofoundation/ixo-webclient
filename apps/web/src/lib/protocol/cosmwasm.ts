import { cosmos, cosmwasm, utils } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import Long from 'long'
import { fee, TSigner } from './common'

export const WasmInstantiateMessage = async (signer: TSigner, payload: { codeId: number; msg: string }[]) => {
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
  return { messages, fee: updatedFee, memo: undefined }
}

export const WasmExecuteTrx = async (
  signer: TSigner,
  payload: { contractAddress: string; msg: string },
  funds = {
    amount: '1',
    denom: 'uixo',
  },
) => {
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

  return { messages: [message], fee, memo: undefined }
}
