import { cosmos, ixo, utils } from '@ixo/impactxclient-sdk'
import { Grant } from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/authz'
import Long from 'long'
import { addDays } from 'utils/common'

export type MsgGrantEntityAccountAuthzProps = {
  ownerAddress: string
  entityDid: string
  name?: string
  granteeAddress: string
  grant: Grant
}


export const MsgGrantEntityAccountAuthz = ({
  ownerAddress,
  entityDid,
  name = 'admin',
  granteeAddress,
  grant,
}: MsgGrantEntityAccountAuthzProps) => {
  return {
    typeUrl: '/ixo.entity.v1beta1.MsgGrantEntityAccountAuthz',
    value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.fromPartial({
      id: entityDid,
      ownerAddress,
      name,
      granteeAddress,
      grant,
    }),
  }
}

export type SubmitClaimAuthorizationGrantProps = {
  admin: string
  collectionId: string
  agentQuota: number
  currentAuthConstraints: any
}

export const SubmitClaimAuthorizationGrant = ({
  admin,
  collectionId,
  agentQuota,
  currentAuthConstraints,
}: SubmitClaimAuthorizationGrantProps) => {
  return cosmos.authz.v1beta1.Grant.fromPartial({
    authorization: {
      typeUrl: '/ixo.claims.v1beta1.SubmitClaimAuthorization',
      value: ixo.claims.v1beta1.SubmitClaimAuthorization.encode(
        ixo.claims.v1beta1.SubmitClaimAuthorization.fromPartial({
          admin,
          constraints: [
            ixo.claims.v1beta1.SubmitClaimConstraints.fromPartial({
              collectionId,
              agentQuota: Long.fromNumber(agentQuota),
            }),
            ...currentAuthConstraints,
          ],
        }),
      ).finish(),
    },
    expiration: utils.proto.toTimestamp(addDays(new Date(), 365 * 3)),
  })
}

export type EvaluateClaimAuthorizationGrantProps = {
  admin: string
  collectionId: string
  agentQuota: number
  currentAuthConstraints: any
  claimIds: string[]
}

export const EvaluateClaimAuthorizationGrant = ({
  admin,
  collectionId,
  agentQuota,
  currentAuthConstraints,
  claimIds,
}: EvaluateClaimAuthorizationGrantProps) => {
  return cosmos.authz.v1beta1.Grant.fromPartial({
    authorization: {
      typeUrl: '/ixo.claims.v1beta1.EvaluateClaimAuthorization',
      value: ixo.claims.v1beta1.EvaluateClaimAuthorization.encode(
        ixo.claims.v1beta1.EvaluateClaimAuthorization.fromPartial({
          admin,
          constraints: [
            ixo.claims.v1beta1.EvaluateClaimConstraints.fromPartial({
              collectionId,
              claimIds,
              agentQuota: Long.fromNumber(agentQuota),
              beforeDate: utils.proto.toTimestamp(addDays(new Date(), 365)),
              // if want to do custom amount, must be within allowed authz if through authz
              maxCustomAmount: [
                cosmos.base.v1beta1.Coin.fromPartial({
                  amount: '2000000',
                  denom: 'uixo',
                }),
              ],
            }),
            ...currentAuthConstraints,
          ],
        }),
      ).finish(),
    },
    expiration: utils.proto.toTimestamp(addDays(new Date(), 365)),
  })
}
