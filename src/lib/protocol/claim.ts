import { fee, RPC_ENDPOINT, TSigner } from './common'
import { ixo, SigningStargateClient, utils, cosmos } from '@ixo/impactxclient-sdk'
import { DeliverTxResponse } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/stargate'
import { addDays } from 'utils/common'
import Long from 'long'

const { createRPCQueryClient } = cosmos.ClientFactory

export const CreateCollection = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    entityDid: string
    protocolDid: string
    paymentsAccount?: string
  },
): Promise<DeliverTxResponse> => {
  const { entityDid, protocolDid, paymentsAccount } = payload

  const message = {
    typeUrl: '/ixo.claims.v1beta1.MsgCreateCollection',
    value: ixo.claims.v1beta1.MsgCreateCollection.fromPartial({
      signer: signer.address,
      entity: entityDid,
      protocol: protocolDid,
      startDate: utils.proto.toTimestamp(new Date()),
      endDate: utils.proto.toTimestamp(addDays(new Date(), 365)),
      quota: Long.fromNumber(100),
      state: ixo.claims.v1beta1.CollectionState.OPEN,
      payments: paymentsAccount
        ? ixo.claims.v1beta1.Payments.fromPartial({
            approval: ixo.claims.v1beta1.Payment.fromPartial({
              account: paymentsAccount,
              amount: [
                cosmos.base.v1beta1.Coin.fromPartial({
                  amount: '1000000',
                  denom: 'uixo',
                }),
              ],
              timeoutNs: utils.proto.toDuration((1000000000 * 60 * 0).toString()), // ns * seconds * minutes
              // contract_1155Payment:
              //   ixo.claims.v1beta1.Contract1155Payment.fromPartial({
              //     address:
              //       "ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c",
              //     tokenId: "db03fa33c1e2ca35794adbb14aebb153",
              //     amount: 1,
              //   }),
            }),
            submission: ixo.claims.v1beta1.Payment.fromPartial({
              account: paymentsAccount,
              amount: [
                cosmos.base.v1beta1.Coin.fromPartial({
                  amount: '1000000',
                  denom: 'uixo',
                }),
              ],
              timeoutNs: utils.proto.toDuration((1000000000 * 60 * 0.5).toString()), // ns * seconds * minutes
              // contract_1155Payment:
              //   ixo.claims.v1beta1.Contract1155Payment.fromPartial({
              //     address:
              //       "ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c",
              //     tokenId: "db03fa33c1e2ca35794adbb14aebb153",
              //     amount: 1,
              //   }),
            }),
            evaluation: ixo.claims.v1beta1.Payment.fromPartial({
              account: paymentsAccount,
              amount: [
                cosmos.base.v1beta1.Coin.fromPartial({
                  amount: '1000000',
                  denom: 'uixo',
                }),
              ],
              timeoutNs: utils.proto.toDuration((1000000000 * 60 * 5).toString()), // ns * seconds * minutes
            }),
            rejection: ixo.claims.v1beta1.Payment.fromPartial({
              account: paymentsAccount,
              amount: [],
              timeoutNs: utils.proto.toDuration((1000000000 * 60 * 5).toString()), // ns * seconds * minutes
            }),
          })
        : undefined,
    }),
  }
  const response = await client.signAndBroadcast(signer.address, [message], fee)
  console.log('CreateCollection', { response })
  return response
}

export const GrantEntityAccountClaimsSubmitAuthz = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    entityDid: string
    name: string
    adminAddress: string
    collectionId: string
    granteeAddress: string
    agentQuota?: number
    overrideCurretGrants?: boolean
  },
) => {
  const {
    entityDid,
    name,
    adminAddress,
    granteeAddress,
    collectionId,
    agentQuota = 100,
    overrideCurretGrants = false,
  } = payload

  const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
  const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
    grantee: granteeAddress,
  })
  const submitAuth = granteeGrants.grants.find(
    (g) => g.authorization?.typeUrl === '/ixo.claims.v1beta1.SubmitClaimAuthorization' && g.granter === adminAddress,
  )
  const granteeCurrentAuthConstraints =
    overrideCurretGrants || submitAuth === undefined
      ? []
      : client.registry.decode(submitAuth!.authorization!).constraints

  const message = {
    typeUrl: '/ixo.entity.v1beta1.MsgGrantEntityAccountAuthz',
    value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.fromPartial({
      id: entityDid,
      ownerAddress: signer.address,
      name,
      granteeAddress,
      grant: cosmos.authz.v1beta1.Grant.fromPartial({
        authorization: {
          typeUrl: '/ixo.claims.v1beta1.SubmitClaimAuthorization',
          value: ixo.claims.v1beta1.SubmitClaimAuthorization.encode(
            ixo.claims.v1beta1.SubmitClaimAuthorization.fromPartial({
              admin: adminAddress,
              constraints: [
                ixo.claims.v1beta1.SubmitClaimConstraints.fromPartial({
                  collectionId,
                  agentQuota: Long.fromNumber(agentQuota),
                }),
                ...granteeCurrentAuthConstraints,
              ],
            }),
          ).finish(),
        },
        expiration: utils.proto.toTimestamp(addDays(new Date(), 365 * 3)),
      }),
    }),
  }

  const response = await client.signAndBroadcast(signer.address, [message], fee)
  return response
}

export const MsgExecAgentSubmit = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    claimId: string
    collectionId: string
    adminAddress: string
  },
): Promise<DeliverTxResponse> => {
  const { claimId, collectionId, adminAddress } = payload
  const message = {
    typeUrl: '/cosmos.authz.v1beta1.MsgExec',
    value: cosmos.authz.v1beta1.MsgExec.fromPartial({
      grantee: signer.address,
      msgs: [
        {
          typeUrl: '/ixo.claims.v1beta1.MsgSubmitClaim',
          value: ixo.claims.v1beta1.MsgSubmitClaim.encode(
            ixo.claims.v1beta1.MsgSubmitClaim.fromPartial({
              adminAddress: adminAddress,
              agentAddress: signer.address,
              agentDid: signer.did,
              claimId,
              collectionId,
            }),
          ).finish(),
        },
      ],
    }),
  }

  const response = await client.signAndBroadcast(signer.address, [message], fee)
  return response
}

export const GrantEntityAccountClaimsEvaluateAuthz = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    entityDid: string
    name: string
    adminAddress: string
    collectionId: string
    granteeAddress: string
    claimIds?: string[]
    agentQuota?: number
    overrideCurretGrants?: boolean
  },
) => {
  const {
    entityDid,
    name,
    adminAddress,
    collectionId,
    granteeAddress,
    claimIds = [],
    agentQuota = 100,
    overrideCurretGrants = false,
  } = payload

  const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
  const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
    grantee: granteeAddress,
  })
  const evaluateAuth = granteeGrants.grants.find(
    (g) => g.authorization?.typeUrl === '/ixo.claims.v1beta1.EvaluateClaimAuthorization' && g.granter === adminAddress,
  )
  const granteeCurrentAuthConstraints =
    overrideCurretGrants || evaluateAuth === undefined
      ? []
      : client.registry.decode(evaluateAuth!.authorization!).constraints

  const message = {
    typeUrl: '/ixo.entity.v1beta1.MsgGrantEntityAccountAuthz',
    value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.fromPartial({
      id: entityDid,
      ownerAddress: signer.address,
      name,
      granteeAddress,
      grant: cosmos.authz.v1beta1.Grant.fromPartial({
        authorization: {
          typeUrl: '/ixo.claims.v1beta1.EvaluateClaimAuthorization',
          value: ixo.claims.v1beta1.EvaluateClaimAuthorization.encode(
            ixo.claims.v1beta1.EvaluateClaimAuthorization.fromPartial({
              admin: adminAddress,
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
                ...granteeCurrentAuthConstraints,
              ],
            }),
          ).finish(),
        },
        expiration: utils.proto.toTimestamp(addDays(new Date(), 365)),
      }),
    }),
  }

  const response = await client.signAndBroadcast(signer.address, [message], fee)
  return response
}

export const MsgExecAgentEvaluate = async (
  client: SigningStargateClient,
  signer: TSigner,
  payload: {
    claimId: string
    collectionId: string
    adminAddress: string
    status?: number
  },
) => {
  const { claimId, collectionId, adminAddress, status = ixo.claims.v1beta1.EvaluationStatus.APPROVED } = payload

  const message = {
    typeUrl: '/cosmos.authz.v1beta1.MsgExec',
    value: cosmos.authz.v1beta1.MsgExec.fromPartial({
      grantee: signer.address,
      msgs: [
        {
          typeUrl: '/ixo.claims.v1beta1.MsgEvaluateClaim',
          value: ixo.claims.v1beta1.MsgEvaluateClaim.encode(
            ixo.claims.v1beta1.MsgEvaluateClaim.fromPartial({
              adminAddress: adminAddress,
              agentAddress: signer.address,
              agentDid: signer.did,
              oracle: signer.did,
              claimId,
              collectionId,
              status,
              reason: 1,
              verificationProof: 'cid of verificationProof',
              // if want to do custom amount, must be within allowed authz if through authz
              // amount: [
              //   cosmos.base.v1beta1.Coin.fromPartial({
              //     amount: "1500000",
              //     denom: "uixo",
              //   }),
              // ],
            }),
          ).finish(),
        },
      ],
    }),
  }

  const response = await client.signAndBroadcast(signer.address, [message], fee)
  return response
}
