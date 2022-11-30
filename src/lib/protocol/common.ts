import { ixo } from '@ixo/impactxclient-sdk'
import { toHex } from '@cosmjs/encoding'

export type KeyTypes = 'ed' | 'secp'

export const fee: any = {
  amount: [
    {
      denom: 'uixo',
      amount: '100000',
    },
  ],
  gas: '3000000',
}

export const getVerificationMethod = (did: string, pubkey: Uint8Array, controller: string, type: KeyTypes): any => {
  return ixo.iid.v1beta1.VerificationMethod.fromPartial({
    id: did,
    type: type === 'ed' ? 'Ed25519VerificationKey2018' : 'EcdsaSecp256k1VerificationKey2019',
    publicKeyMultibase: 'F' + toHex(pubkey),
    controller: controller,
  })
}

export const getDidFromEvents = (res: any): string => {
  try {
    return JSON.parse(res.rawLog!)[0]
      ['events'].find((e: any) => e.type === 'ixo.iid.v1beta1.IidDocumentCreatedEvent')
      ['attributes'].find((e: any) => e.key === 'did')
      ['value'].replaceAll('"', '')
  } catch (e) {
    console.error('getDidFromEvents', e)
    return undefined!
  }
}
