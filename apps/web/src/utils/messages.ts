import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules'
import { fromBase64, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'
import { GeneratedType, Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes } from '@cosmjs/stargate'
import { BankMsg, CosmosMsgFor_Empty, DistributionMsg, MintMsg, StakingMsg, StargateMsg, WasmMsg } from 'types/dao'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import { GenericAuthorization } from 'cosmjs-types/cosmos/authz/v1beta1/authz'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { PubKey } from 'cosmjs-types/cosmos/crypto/ed25519/keys'

import { objectMatchesStructure } from './validation'
import { ixo } from '@ixo/impactxclient-sdk'

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const jsonMessage = fromUtf8(fromBase64(base64String))
    if (jsonMessage) {
      return JSON.parse(jsonMessage)
    }
  }
  return undefined
}

export const encodeMessageAsBase64 = (message: any) => toBase64(toUtf8(JSON.stringify(message)))

export type WasmMsgType = 'execute' | 'instantiate' | 'migrate' | 'update_admin' | 'clear_admin'

const WASM_TYPES: WasmMsgType[] = ['execute', 'instantiate', 'migrate', 'update_admin', 'clear_admin']

const BINARY_WASM_TYPES: { [key: string]: boolean } = {
  execute: true,
  instantiate: true,
  migrate: true,
}

export function isWasmMsg(msg?: CosmosMsgFor_Empty): msg is { wasm: WasmMsg } {
  if (msg) {
    return (msg as any).wasm !== undefined
  }
  return false
}

function getWasmMsgType(wasm: WasmMsg): WasmMsgType | undefined {
  for (const wasmType of WASM_TYPES) {
    if ((wasm as any)[wasmType]) {
      return wasmType
    }
  }
  return undefined
}

export type DecodedStargateMsg<Value = any> = {
  stargate: {
    typeUrl: string
    value: Value
  }
}

export const isCosmWasmStargateMsg = (msg: any): msg is StargateMsg =>
  objectMatchesStructure(msg, {
    stargate: {
      type_url: {},
      value: {},
    },
  }) && typeof msg.stargate.value === 'string'

export const isDecodedStargateMsg = (msg: any): msg is DecodedStargateMsg =>
  objectMatchesStructure(msg, {
    stargate: {
      typeUrl: {},
      value: {},
    },
  }) && typeof msg.stargate.value === 'object'

function isBinaryType(msgType?: WasmMsgType): boolean {
  if (msgType) {
    return !!BINARY_WASM_TYPES[msgType]
  }
  return false
}

export function decodeMessages(msgs: CosmosMsgFor_Empty[]): { [key: string]: any }[] {
  const decodedMessageArray: any[] = []
  for (const msgObj of msgs) {
    if (isWasmMsg(msgObj)) {
      const msgType = getWasmMsgType(msgObj.wasm)
      if (msgType && isBinaryType(msgType)) {
        const base64Msg = (msgObj.wasm as any)[msgType]
        if (base64Msg) {
          const msg = parseEncodedMessage(base64Msg.msg)
          if (msg) {
            decodedMessageArray.push({
              ...msgObj,
              wasm: {
                ...msgObj.wasm,
                [msgType]: {
                  ...base64Msg,
                  msg,
                },
              },
            })
          }
        }
      }
    } else if (isCosmWasmStargateMsg(msgObj)) {
      // Decode Stargate protobuf message.
      decodedMessageArray.push(decodeStargateMessage(msgObj))
    } else {
      decodedMessageArray.push(msgObj)
    }
  }

  const decodedMessages = decodedMessageArray.length ? decodedMessageArray : msgs

  return decodedMessages
}

export function decodedMessagesString(msgs: CosmosMsgFor_Empty[]): string {
  const decodedMessageArray = decodeMessages(msgs)
  return JSON.stringify(decodedMessageArray, undefined, 2)
}

// This function mutates its input message.
export const makeWasmMessage = (message: {
  wasm: any
}): {
  wasm: WasmMsg
} => {
  // We need to encode Wasm Execute, Instantiate, and Migrate messages.
  const msg = message
  if (message.wasm.execute) {
    msg.wasm.execute.msg = toBase64(toUtf8(JSON.stringify(message.wasm.execute.msg)))
  } else if (message.wasm.instantiate) {
    msg.wasm.instantiate.msg = toBase64(toUtf8(JSON.stringify(message.wasm.instantiate.msg)))
  } else if (message.wasm.migrate) {
    msg.wasm.migrate.msg = toBase64(toUtf8(JSON.stringify(message.wasm.migrate.msg)))
  }
  // Messages such as update or clear admin pass through without modification.
  return msg
}

export const typesRegistry = new Registry([
  ...defaultRegistryTypes,
  ...wasmTypes,

  // Custom types not in @cosmjs/stargate default registry.
  ...([
    ['/cosmos.slashing.v1beta1.MsgUnjail', MsgUnjail],
    ['/cosmos.authz.v1beta1.GenericAuthorization', GenericAuthorization],
    ['/cosmos.crypto.ed25519.PubKey', PubKey],
    ['/ixo.iid.v1beta1.MsgAddLinkedEntity', ixo.iid.v1beta1.MsgAddLinkedEntity],
    ['/ixo.entity.v1beta1.MsgUpdateEntityVerified', ixo.entity.v1beta1.MsgUpdateEntityVerified],
    ['/ixo.iid.v1beta1.MsgAddVerification', ixo.iid.v1beta1.MsgAddVerification],
    ['/ixo.iid.v1beta1.MsgDeleteLinkedResource', ixo.iid.v1beta1.MsgDeleteLinkedResource],
    ['/ixo.entity.v1beta1.MsgUpdateEntity', ixo.entity.v1beta1.MsgUpdateEntity],
    ['/ixo.entity.v1beta1.MsgCreateEntity', ixo.entity.v1beta1.MsgCreateEntity],
  ] as ReadonlyArray<[string, GeneratedType]>),
])

// Encodes a protobuf message value from its JSON representation into a byte
// array.
export const encodeProtobufValue = (typeUrl: string, value: any): Uint8Array => {
  const type = typesRegistry.lookupType(typeUrl)
  if (!type) {
    throw new Error(`Type ${typeUrl} not found in registry.`)
  }

  const encodedValue = type.encode(value).finish()
  return encodedValue
}

// Decodes an encoded protobuf message's value from a Uint8Array or base64
// string into its JSON representation.
export const decodeProtobufValue = (typeUrl: string, encodedValue: string | Uint8Array): any => {
  const type = typesRegistry.lookupType(typeUrl)
  if (!type) {
    throw new Error(`Type ${typeUrl} not found in registry.`)
  }

  const decodedValue = type.decode(typeof encodedValue === 'string' ? fromBase64(encodedValue) : encodedValue)
  return decodedValue
}

// Encodes a protobuf message in its JSON representation into a protobuf `Any`.
export const encodeRawProtobufMsg = ({ typeUrl, value }: DecodedStargateMsg['stargate']): Any => ({
  typeUrl,
  value: encodeProtobufValue(typeUrl, value),
})

// Decodes a protobuf message from `Any` into its JSON representation.
export const decodeRawProtobufMsg = ({ typeUrl, value }: Any): DecodedStargateMsg['stargate'] => ({
  typeUrl,
  value: decodeProtobufValue(typeUrl, value),
})

// Encodes a protobuf message from its JSON representation into a `StargateMsg`
// that `CosmWasm` understands.
export const makeStargateMessage = ({ stargate: { typeUrl, value } }: DecodedStargateMsg): StargateMsg => ({
  stargate: {
    type_url: typeUrl,
    value: toBase64(encodeProtobufValue(typeUrl, value)),
  },
})

// Decodes an encoded protobuf message from CosmWasm's `StargateMsg` into its
// JSON representation.
export const decodeStargateMessage = ({ stargate: { type_url, value } }: StargateMsg): DecodedStargateMsg => ({
  stargate: {
    typeUrl: type_url,
    value: decodeProtobufValue(type_url, value),
  },
})

export const makeExecutableMintMessage = (msg: MintMsg, contractAddress: string): CosmosMsgFor_Empty => ({
  wasm: {
    execute: {
      contract_addr: contractAddress,
      msg: toBase64(toUtf8(JSON.stringify(msg))),
      funds: [],
    },
  },
})

export const makeMintMessage = (amount: string, recipient: string): MintMsg => ({
  mint: {
    amount,
    recipient,
  },
})

export const makeBankMessage = (amount: string, to: string, denom: string): BankMsg => ({
  send: {
    amount: [
      {
        amount,
        denom,
      },
    ],
    to_address: to,
  },
})

export enum StakeType {
  Delegate = 'delegate',
  Undelegate = 'undelegate',
  Redelegate = 'redelegate',
  WithdrawDelegatorReward = 'withdraw_delegator_reward',
}

export const makeStakingMessage = (
  type: `${StakeType}`,
  amount: string,
  denom: string,
  validator: string,
  toValidator = '',
): CosmosMsgFor_Empty => {
  const coin = {
    amount,
    denom,
  }

  let staking: StakingMsg
  switch (type) {
    case StakeType.Delegate:
      staking = {
        delegate: {
          amount: coin,
          validator,
        },
      }
      break
    case StakeType.Undelegate:
      staking = {
        undelegate: {
          amount: coin,
          validator,
        },
      }
      break
    case StakeType.Redelegate:
      staking = {
        redelegate: {
          amount: coin,
          src_validator: validator,
          dst_validator: toValidator,
        },
      }
      break
    default:
      throw new Error('Unexpected staking type')
  }

  return { staking }
}

export const makeDistributeMessage = (validator: string): CosmosMsgFor_Empty => ({
  distribution: {
    withdraw_delegator_reward: {
      validator,
    },
  } as DistributionMsg,
})

// // Decode governance proposal content using a protobuf.
// export const decodeGovProposalContent = (govProposal: GovProposal): GovProposalWithDecodedContent => ({
//   ...govProposal,
//   // It seems as though all proposals can be decoded as a TextProposal, as they
//   // tend to start with `title` and `description` fields. This successfully
//   // decoded the first 80 proposals, so it's probably intentional.
//   decodedContent: cosmos.gov.v1beta1.TextProposal.decode(govProposal.content.value),
// })
