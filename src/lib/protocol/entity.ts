import { createQueryClient, ixo, SigningStargateClient, customMessages } from '@ixo/impactxclient-sdk'
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
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import BigNumber from 'bignumber.js'
import { fee, RPC_ENDPOINT, TSigner } from './common'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'

export const CreateEntity = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    entityType: string
    entityStatus?: number
    context?: Context[]
    service?: Service[]
    linkedResource?: LinkedResource[]
    accordedRight?: AccordedRight[]
    linkedEntity?: LinkedEntity[]
    linkedClaim?: LinkedClaim[]
    verification?: Verification[]
  }[],
): Promise<DeliverTxResponse | undefined> => {
  try {
    const { address, did, pubKey, keyType } = signer
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
      } = item
      return {
        typeUrl: '/ixo.entity.v1beta1.MsgCreateEntity',
        value: ixo.entity.v1beta1.MsgCreateEntity.fromPartial({
          entityType: entityType.toLowerCase(),
          context: customMessages.iid.createAgentIidContext(context as [{ key: string; val: string }]),
          verification:
            verification.length > 0
              ? verification
              : customMessages.iid.createIidVerificationMethods({
                  did,
                  pubkey: pubKey,
                  address: address,
                  controller: did,
                  type: keyType,
                }),
          controller: [did],
          ownerDid: did,
          ownerAddress: address,
          relayerNode: did,
          service: service.map((item: Service) => ixo.iid.v1beta1.Service.fromPartial(item)),
          linkedResource: linkedResource.map((item: LinkedResource) =>
            ixo.iid.v1beta1.LinkedResource.fromPartial(item),
          ),
          accordedRight: accordedRight.map((item: AccordedRight) => ixo.iid.v1beta1.AccordedRight.fromPartial(item)),
          linkedEntity: linkedEntity.map((item: LinkedEntity) => ixo.iid.v1beta1.LinkedEntity.fromPartial(item)),
          linkedClaim: linkedClaim.map((item: LinkedClaim) => ixo.iid.v1beta1.LinkedClaim.fromPartial(item)),
          entityStatus,
        }),
      }
    })
    const updatedFee = {
      ...fee,
      gas: new BigNumber(fee.gas).times(messages.length).toString(),
    }
    console.log('CreateEntity', 'messages', messages)
    const response = await client.signAndBroadcast(address, messages, updatedFee)
    return response
  } catch (e) {
    console.error('CreateEntity', e)
    return undefined
  }
}

// export const TransferEntity = async (entityDid: string): Promise<any> => {
//   const client = await createClient()

//   const tester = getUser()
//   const account = (await tester.getAccounts())[0]
//   const myAddress = account.address
//   const did = tester.did

//   const alice = getUser(WalletUsers.alice)

//   const message = {
//     typeUrl: '/ixo.entity.v1beta1.MsgTransferEntity',
//     value: ixo.entity.v1beta1.MsgTransferEntity.fromPartial({
//       entityDid: entityDid,
//       ownerDid: did,
//       ownerAddress: myAddress,
//       recipientDid: alice.did,
//     }),
//   }

//   const response = await client.signAndBroadcast(myAddress, [message], fee)
//   return response
// }

// export const UpdateEntity = async (): Promise<any> => {
//   const client = await createClient()

//   const tester = getUser()
//   const account = (await tester.getAccounts())[0]
//   const myAddress = account.address
//   const did = tester.did

//   const message = {
//     typeUrl: '/ixo.entity.v1beta1.MsgUpdateEntity',
//     value: ixo.entity.v1beta1.MsgUpdateEntity.fromPartial({
//       status: 1,
//       controllerDid: did,
//       controllerAddress: myAddress,
//     }),
//   }

//   const response = await client.signAndBroadcast(myAddress, [message], fee)
//   return response
// }

export const EntityList = async (request: QueryEntityListRequest): Promise<QueryEntityListResponse> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT!)
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
    const client = await createQueryClient(RPC_ENDPOINT!)
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
    const client = await createQueryClient(RPC_ENDPOINT!)
    const { iidDocument } = await client.ixo.entity.v1beta1.entityIidDocument(request)
    client.cosmos.base.tendermint.v1beta1.getLatestValidatorSet()
    return iidDocument!
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
}
