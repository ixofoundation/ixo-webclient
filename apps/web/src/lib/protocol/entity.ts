import { ixo, customMessages, utils } from '@ixo/impactxclient-sdk'
import {
  QueryEntityIidDocumentRequest,
  QueryEntityListRequest,
  QueryEntityListResponse,
  QueryEntityRequest,
  QueryEntityResponse,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import {
  AccordedRight,
  LinkedEntity,
  LinkedResource,
  Service,
  Context,
  LinkedClaim,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import BigNumber from 'bignumber.js'
import { fee, RPC_ENDPOINT, TSigner } from './common'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { EncodeObject } from '@cosmjs/proto-signing'
import { MsgTransferEntity, MsgUpdateEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/tx'
import { hexToUint8Array } from 'utils/encoding'

const createRPCQueryClient = ixo.ClientFactory.createRPCQueryClient

export const CreateEntityMessage = async (
  signer: TSigner,
  payload: {
    entityType: string
    entityStatus?: number
    context?: Context[]
    service?: Service[]
    controller?: string[]
    linkedResource?: LinkedResource[]
    accordedRight?: AccordedRight[]
    linkedEntity?: LinkedEntity[]
    linkedClaim?: LinkedClaim[]
    verification?: Verification[]
    relayerNode?: string
    startDate?: string
    endDate?: string
  }[],
) => {
  const { address, did, pubKey, keyType } = signer

  const hexPubKey = hexToUint8Array(pubKey as any)
  const messages = payload.map((item) => {
    const {
      entityType,
      entityStatus,
      context = [],
      service = [],
      linkedResource = [],
      accordedRight = [],
      linkedEntity = [],
      linkedClaim = [],
      verification = [],
      controller = [],
      relayerNode = did,
      startDate = '',
      endDate = '',
    } = item
    return {
      typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
      value: ixo.entity.v1beta1.MsgCreateEntity.fromPartial({
        entityType: entityType?.toLowerCase(),
        context: customMessages.iid.createAgentIidContext(context as [{ key: string; val: string }]),
        verification: [
          ...customMessages.iid.createIidVerificationMethods({
            did,
            pubkey: hexPubKey,
            address: address,
            controller: did,
            type: keyType,
          }),
          ...verification,
        ],
        controller: [did, ...controller],
        ownerDid: did,
        ownerAddress: address,
        relayerNode: relayerNode,
        service: service.map((item: Service) => ixo.iid.v1beta1.Service.fromPartial(item)),
        linkedResource: linkedResource.map((item: LinkedResource) => ixo.iid.v1beta1.LinkedResource.fromPartial(item)),
        accordedRight: accordedRight.map((item: AccordedRight) => ixo.iid.v1beta1.AccordedRight.fromPartial(item)),
        linkedEntity: linkedEntity.map((item: LinkedEntity) => ixo.iid.v1beta1.LinkedEntity.fromPartial(item)),
        linkedClaim: linkedClaim.map((item: LinkedClaim) => ixo.iid.v1beta1.LinkedClaim.fromPartial(item)),
        entityStatus,
        startDate: startDate ? utils.proto.toTimestamp(new Date(startDate)) : undefined,
        endDate: endDate ? utils.proto.toTimestamp(new Date(endDate)) : undefined,
      }),
    }
  })
  const updatedFee = { ...fee, gas: new BigNumber(fee.gas).times(messages.length).toString() }
  console.log('CreateEntity', { messages })
  return { messages, fee: updatedFee }
}

export const EntityList = async (request: QueryEntityListRequest): Promise<QueryEntityListResponse> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    const res: QueryEntityListResponse = await client.ixo.entity.v1beta1.entityList(request)
    return res
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
}

/**
 * 
 * @param request 
 *  export interface QueryEntityRequest {
      id: string;
    }
 * @returns 
 */
export const GetEntity = async (request: QueryEntityRequest): Promise<QueryEntityResponse> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    const res: QueryEntityResponse = await client.ixo.entity.v1beta1.entity(request)
    return res
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
}

/**
 * 
 * @param request 
 *  export interface QueryEntityRequest {
      id: string;
    }
 * @returns 
 */
export const GetEntityIidDocument = async (request: QueryEntityIidDocumentRequest): Promise<IidDocument> => {
  try {
    const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    const { iidDocument } = await client.ixo.entity.v1beta1.entityIidDocument(request)
    client.cosmos.base.tendermint.v1beta1.getLatestValidatorSet()
    return iidDocument!
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
}

export const GetUpdateStartAndEndDateMsgs = (payload: Partial<MsgUpdateEntity>): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntity',
      value: ixo.entity.v1beta1.MsgUpdateEntity.fromPartial(payload),
    },
  ]
}

export const TransferEntityMessage = async (signer: TSigner, payload: Partial<MsgTransferEntity>) => {
  const { id, recipientDid } = payload
  const message = {
    typeUrl: '/ixo.entity.v1beta1.MsgTransferEntity',
    value: ixo.entity.v1beta1.MsgTransferEntity.fromPartial({
      id,
      recipientDid,
      ownerDid: signer.did,
      ownerAddress: signer.address,
    }),
  }

  console.log('TransferEntity', { message })
  return { messages: [message], fee }
}

export const UpdateEntityMessage = async (signer: TSigner, payload: Partial<MsgUpdateEntity>) => {
  const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
  const entity = await queryClient.ixo.entity.v1beta1.entity({
    id: payload?.id || signer.address,
  })
  if (!entity.entity) {
    throw new Error('Entity not found')
  }

  const message = {
    typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntity',
    value: ixo.entity.v1beta1.MsgUpdateEntity.fromPartial({
      id: payload?.id || signer.did,
      entityStatus: payload?.entityStatus === undefined ? entity.entity.status : payload?.entityStatus,
      startDate: payload?.startDate || entity.entity.startDate,
      endDate: payload?.endDate || entity.entity.endDate,
      credentials: payload?.credentials || entity.entity.credentials,
      controllerDid: signer.did,
      controllerAddress: signer.address,
    }),
  }

  console.log('UpdateEntity', { message })
  return { messages: [message], fee }
}
