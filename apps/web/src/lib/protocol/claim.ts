import { fee, RPC_ENDPOINT, TSigner } from './common'
import { ixo, utils, cosmos, createRegistry } from '@ixo/impactxclient-sdk'
import { addDays } from 'utils/common'
import Long from 'long'
import BigNumber from 'bignumber.js'
import { Payments } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { GrantAuthorization } from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/authz'

const { createRPCQueryClient } = cosmos.ClientFactory

export const CreateCollection = (
  signer: TSigner,
  payload: {
    entityDid: string
    protocolDid: string
    startDate: string
    endDate: string
    quota: string
    payments: Payments | undefined
  }[],
) => {
  const messages = payload.map(({ entityDid, protocolDid, payments, startDate, endDate, quota }) => ({
    typeUrl: '/ixo.claims.v1beta1.MsgCreateCollection',
    value: ixo.claims.v1beta1.MsgCreateCollection.encode(
      ixo.claims.v1beta1.MsgCreateCollection.fromPartial({
        signer: signer.address,
        entity: entityDid,
        protocol: protocolDid,
        startDate: utils.proto.toTimestamp(new Date(startDate)),
        endDate: endDate ? utils.proto.toTimestamp(new Date(endDate)) : undefined,
        quota: Long.fromNumber(Number(quota)),
        state: ixo.claims.v1beta1.CollectionState.OPEN,
        payments,
      }),
    ).finish(),
  }))
  const updatedFee = { ...fee, gas: new BigNumber(fee.gas).times(messages.length).toString() }

  return { messages, fee: updatedFee, memo: undefined }
}

export const GrantEntityAccountClaimsSubmitAuthz = async (
  signer: any,
  payload: {
    entityDid: string
    name: string
    adminAddress: string
    collectionId: string
    granteeAddress: string
    agentQuota?: number
    overrideCurretGrants?: boolean
  },
): Promise<any> => {
  try {
    const {
      entityDid,
      name,
      adminAddress,
      granteeAddress,
      collectionId,
      agentQuota = 0,
      overrideCurretGrants = false,
    } = payload

    const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
    const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
      grantee: granteeAddress,
    })
    const submitAuth = granteeGrants.grants.find(
      (g) => g.authorization?.typeUrl === '/ixo.claims.v1beta1.SubmitClaimAuthorization' && g.granter === adminAddress,
    )
    const registry = createRegistry()
    const granteeCurrentAuthConstraints =
      overrideCurretGrants || submitAuth === undefined ? [] : registry.decode(submitAuth!.authorization!).constraints

    console.log({ granteeCurrentAuthConstraints, adminAddress, granteeAddress, owner: signer.owner, entityDid })

    const message = {
      typeUrl: '/ixo.entity.v1beta1.MsgGrantEntityAccountAuthz',
      value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.encode(
        ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.fromPartial({
          id: entityDid,
          ownerAddress: signer.owner,
          name,
          granteeAddress: granteeAddress,
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
      ).finish(),
    }

    return { messages: [message], fee, memo: undefined }
  } catch (error) {
    console.log({ error })
    return error
  }
}

export const MsgExecAgentSubmit = async (
  signer: TSigner,
  payload: {
    claimId: string
    collectionId: string
    adminAddress: string
  },
) => {
  console.log({ ...payload, signer })
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

  return { messages: [message], fee, memo: undefined }
}

export const GrantEntityAccountClaimsEvaluateAuthz = async (
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
    agentQuota = 0,
    overrideCurretGrants = false,
  } = payload

  const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })
  const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
    grantee: granteeAddress,
  })
  const evaluateAuth = granteeGrants.grants.find(
    (g) => g.authorization?.typeUrl === '/ixo.claims.v1beta1.EvaluateClaimAuthorization' && g.granter === adminAddress,
  )
  const registry = createRegistry()
  const granteeCurrentAuthConstraints =
    overrideCurretGrants || evaluateAuth === undefined ? [] : registry.decode(evaluateAuth!.authorization!).constraints

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
  return { messages: [message], fee, memo: undefined }
}

export const MsgExecAgentEvaluate = async (
  signer: TSigner,
  payload: {
    claimId: string
    collectionId: string
    adminAddress: string
    status?: number
    verificationProof: string
  },
) => {
  const {
    claimId,
    collectionId,
    adminAddress,
    status = ixo.claims.v1beta1.EvaluationStatus.APPROVED,
    verificationProof = 'cid',
  } = payload

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
              verificationProof,
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
  return { messages: [message], fee, memo: undefined }
}

export const GetGranteeRole = async (payload: {
  granteeAddress: string
  adminAddress: string
  collectionId?: string
}): Promise<{ submitAuth: GrantAuthorization | undefined; evaluateAuth: GrantAuthorization | undefined }> => {
  const { granteeAddress, adminAddress, collectionId } = payload
  const queryClient = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT! })

  const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
    grantee: granteeAddress,
  })

  const submitAuth = granteeGrants.grants.find(
    (g) =>
      g.authorization?.typeUrl === '/ixo.claims.v1beta1.SubmitClaimAuthorization' &&
      g.granter === adminAddress &&
      (!collectionId ||
        ixo.claims.v1beta1.SubmitClaimAuthorization.decode(g.authorization.value).constraints.find(
          (c) => c.collectionId === collectionId,
        )),
  )
  const evaluateAuth = granteeGrants.grants.find(
    (g) =>
      g.authorization?.typeUrl === '/ixo.claims.v1beta1.EvaluateClaimAuthorization' &&
      g.granter === adminAddress &&
      (!collectionId ||
        ixo.claims.v1beta1.EvaluateClaimAuthorization.decode(g.authorization.value).constraints.find(
          (c) => c.collectionId === collectionId,
        )),
  )
  return { submitAuth, evaluateAuth }
}
