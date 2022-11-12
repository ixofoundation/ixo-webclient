import { ixo } from '@ixo/impactxclient-sdk'
import { toHex } from '@cosmjs/encoding'
import { StdFee } from '@cosmjs/stargate'
import base58 from 'bs58'

export type KeyTypes = 'ed' | 'secp'

export const fee: StdFee = {
  amount: [
    {
      denom: 'uixo',
      amount: '100000',
    },
  ],
  gas: '3000000',
}

export function generateSecpDid(pubkey: Uint8Array, prefix?: string): string {
  const did = base58.encode(pubkey.slice(0, 16))
  return 'did:' + (prefix || 'ixo') + ':' + did
}

export const getVerificationMethod = (
  did: string,
  pubkey: Uint8Array,
  controller: string,
  type: KeyTypes,
): any => {
  return ixo.iid.v1beta1.VerificationMethod.fromPartial({
    id: did,
    type:
      type === 'ed'
        ? 'Ed25519VerificationKey2018'
        : 'EcdsaSecp256k1VerificationKey2019',
    publicKeyMultibase: 'F' + toHex(pubkey),
    controller: controller,
  })
}
