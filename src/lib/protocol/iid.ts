import { ixo, SigningStargateClient, createQueryClient, customMessages } from '@ixo/impactxclient-sdk'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import {
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  VerificationMethod,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { fee, RPC_ENDPOINT, TSigner } from './common'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { EncodeObject } from '@cosmjs/proto-signing'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'

export const CreateIidDoc = async (
  client: SigningStargateClient,
  signer: TSigner,
  userToAddToVerifications?: TSigner,
) => {
  try {
    const { did, pubKey, address, keyType } = signer
    const verifications = customMessages.iid.createIidVerificationMethods({
      did,
      pubkey: pubKey,
      address: address,
      controller: did,
      type: keyType,
    })
    if (userToAddToVerifications) {
      verifications.push(
        ...customMessages.iid.createIidVerificationMethods({
          did: userToAddToVerifications.did,
          pubkey: userToAddToVerifications.pubKey,
          address: userToAddToVerifications.address,
          controller: userToAddToVerifications.did,
          type: userToAddToVerifications.keyType,
        }),
      )
    }
    const message = {
      typeUrl: '/ixo.iid.v1beta1.MsgCreateIidDocument',
      value: ixo.iid.v1beta1.MsgCreateIidDocument.fromPartial({
        context: customMessages.iid.createAgentIidContext(),
        id: did,
        alsoKnownAs: 'user',
        verifications,
        signer: address,
        controllers: [did],
      }),
    }
    const response = await client.signAndBroadcast(address, [message], fee)
    console.log('CreateIidDoc', 'response', response)
    return response
  } catch (e) {
    console.error('CreateIidDoc', e)
    return undefined
  }
}

export const CheckIidDoc = async (did: string): Promise<IidDocument> => {
  try {
    const client = await createQueryClient(RPC_ENDPOINT!)
    const { iidDocument } = await client.ixo.iid.v1beta1.iidDocument({
      id: did,
    })
    console.log('CheckIidDoc', iidDocument)
    return iidDocument!
  } catch (e) {
    console.error('CheckIidDoc', did, e)
    return undefined!
  }
}

// const getAccountInfo = async (): Promise<{
//   accountNumber?: number
//   sequence?: number
// }> => {
//   try {
//     if (!address) {
//       throw `queryClient is not initialized!`
//     }
//     const { account } = await qc.cosmos.auth.v1beta1.account({ address })
//     const { accountNumber, sequence } = accountFromAny(account)
//     return { accountNumber, sequence }
//   } catch (e) {
//     console.error('getAccountInfo:', e)
//     return {}
//   }
// }

export const AddLinkedEntity = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    did: string
    linkedEntity: LinkedEntity
  },
) => {
  const { did, linkedEntity } = payload
  const message = {
    typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
    value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
      id: did,
      linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(linkedEntity),
      signer: signer.address,
    }),
  }
  const response: DeliverTxResponse = await client.signAndBroadcast(signer.address, [message], fee)
  console.info('AddLinkedEntity', response)
  return response
}

export const AddLinkedResource = async (client: SigningStargateClient, signer: TSigner, payload: LinkedResource) => {
  const message = {
    typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedResource',
    value: ixo.iid.v1beta1.MsgAddLinkedResource.fromPartial({
      id: signer.did,
      linkedResource: ixo.iid.v1beta1.LinkedResource.fromPartial(payload),
      signer: signer.address,
    }),
  }

  const response = await client.signAndBroadcast(signer.address, [message], fee)
  return response
}

export const DeleteLinkedResource = async (client: SigningStargateClient, signer: TSigner, resourceId: string) => {
  try {
    const message = {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedResource',
      value: ixo.iid.v1beta1.MsgDeleteLinkedResource.fromPartial({
        id: signer.did,
        resourceId: resourceId,
        signer: signer.address,
      }),
    }

    const response = await client.signAndBroadcast(signer.address, [message], fee)
    return response
  } catch (e) {
    console.error('DeleteLinkedResource', e)
    throw new Error(JSON.stringify(e))
  }
}

export const GetAddLinkedResourceMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedResource,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedResource',
      value: ixo.iid.v1beta1.MsgAddLinkedResource.fromPartial({
        id: entityId,
        linkedResource: ixo.iid.v1beta1.LinkedResource.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetDeleteLinkedResourceMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedResource,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedResource',
      value: ixo.iid.v1beta1.MsgDeleteLinkedResource.fromPartial({
        id: entityId,
        resourceId: payload.id,
        signer: signer.address,
      }),
    },
  ]
}

export const GetReplaceLinkedResourceMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedResource,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedResource',
      value: ixo.iid.v1beta1.MsgDeleteLinkedResource.fromPartial({
        id: entityId,
        resourceId: payload.id,
        signer: signer.address,
      }),
    },
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedResource',
      value: ixo.iid.v1beta1.MsgAddLinkedResource.fromPartial({
        id: entityId,
        linkedResource: ixo.iid.v1beta1.LinkedResource.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetAddLinkedEntityMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedEntity,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
      value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
        id: entityId,
        linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetDeleteLinkedEntityMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedEntity,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedEntity',
      value: ixo.iid.v1beta1.MsgDeleteLinkedEntity.fromPartial({
        id: entityId,
        entityId: payload.id,
        signer: signer.address,
      }),
    },
  ]
}

export const GetReplaceLinkedEntityMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedResource,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedEntity',
      value: ixo.iid.v1beta1.MsgDeleteLinkedEntity.fromPartial({
        id: entityId,
        entityId: payload.id,
        signer: signer.address,
      }),
    },
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
      value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
        id: entityId,
        linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetAddLinkedClaimMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedClaim,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedClaim',
      value: ixo.iid.v1beta1.MsgAddLinkedClaim.fromPartial({
        id: entityId,
        linkedClaim: ixo.iid.v1beta1.LinkedClaim.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetDeleteLinkedClaimMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedClaim,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedClaim',
      value: ixo.iid.v1beta1.MsgDeleteLinkedClaim.fromPartial({
        id: entityId,
        claimId: payload.id,
        signer: signer.address,
      }),
    },
  ]
}

export const GetReplaceLinkedClaimMsgs = (
  entityId: string,
  signer: TSigner,
  payload: LinkedClaim,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgDeleteLinkedClaim',
      value: ixo.iid.v1beta1.MsgDeleteLinkedClaim.fromPartial({
        id: entityId,
        claimId: payload.id,
        signer: signer.address,
      }),
    },
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedClaim',
      value: ixo.iid.v1beta1.MsgAddLinkedClaim.fromPartial({
        id: entityId,
        linkedClaim: ixo.iid.v1beta1.LinkedClaim.fromPartial(payload),
        signer: signer.address,
      }),
    },
  ]
}

export const GetAddVerifcationMethodMsgs = (
  entityId: string,
  signer: TSigner,
  payload: Verification,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgAddVerification',
      value: ixo.iid.v1beta1.MsgAddVerification.fromPartial({
        id: entityId,
        verification: payload,
        signer: signer.address,
      }),
    },
  ]
}

export const GetDeleteVerifcationMethodMsgs = (
  entityId: string,
  signer: TSigner,
  payload: Verification,
): readonly EncodeObject[] => {
  return [
    {
      typeUrl: '/ixo.iid.v1beta1.MsgRevokeVerification',
      value: ixo.iid.v1beta1.MsgRevokeVerification.fromPartial({
        id: entityId,
        methodId: payload.method?.id,
        signer: signer.address,
      }),
    },
  ]
}

export const AddVerificationMethod = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: { did: string; relationships: string[]; method: VerificationMethod },
) => {
  const { did, relationships, method } = payload

  const message = {
    typeUrl: '/ixo.iid.v1beta1.MsgAddVerification',
    value: ixo.iid.v1beta1.MsgAddVerification.fromPartial({
      id: did,
      verification: ixo.iid.v1beta1.Verification.fromPartial({
        relationships: relationships,
        method: method,
      }),
      signer: signer.address,
    }),
  }

  const response: DeliverTxResponse = await client.signAndBroadcast(signer.address, [message], fee)
  console.log('AddVerificationMethod', 'response', response)
  return response
}
