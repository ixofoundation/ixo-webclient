import { ixo, SigningStargateClient, createQueryClient, customMessages } from '@ixo/impactxclient-sdk'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { fee, RPC_ENDPOINT, TSigner } from './common'

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
