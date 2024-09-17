import { useWallet } from 'wallet-connector'
import { createRegistry, ixo } from '@ixo/impactxclient-sdk'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { RPC_ENDPOINT, fee } from 'lib/protocol'
import { getQueryClient } from 'lib/queryClient'
import { MsgExecAuthZ } from 'messages/authz/authz'
import {
  EvaluateClaimAuthorizationGrant,
  MsgGrantEntityAccountAuthz,
  SubmitClaimAuthorizationGrant,
} from 'messages/claims/MsgGrantEntityAccountAuthz'

export const useGrantEntityAccountAuthZ = () => {
  const { wallet, execute } = useWallet()

  const getGranteeAuthConstraints = async ({
    admin,
    grantee,
    messageTypeUrl,
  }: {
    admin: string
    grantee: string
    messageTypeUrl: string
  }) => {
    const queryClient = await getQueryClient(RPC_ENDPOINT)
    const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
      grantee: grantee,
    })

    const evaluateAuth = granteeGrants.grants.find(
      (g) => g.authorization?.typeUrl === messageTypeUrl && g.granter === admin,
    )

    const registry = createRegistry()
    const currentAuthConstraints =
      evaluateAuth === undefined ? [] : registry.decode(evaluateAuth!.authorization!).constraints

    return { hasAuthZ: evaluateAuth, currentAuthConstraints }
  }

  const grantEvaluatorAuthZ = async ({
    agentQuota,
    admin,
    claimIds,
    collectionId,
    ownerAddress,
    entityDid,
    granteeAddress,
    maxAmounts,
  }: {
    agentQuota: number
    admin: string
    claimIds: string[]
    collectionId: string
    ownerAddress: string
    entityDid: string
    granteeAddress: string
    maxAmounts?: Coin[]
  }) => {
    const currentAuthZ = await getGranteeAuthConstraints({
      admin: admin,
      grantee: granteeAddress,
      messageTypeUrl: '/ixo.claims.v1beta1.EvaluateClaimAuthorization',
    })

    const evaluatorGrant = EvaluateClaimAuthorizationGrant({
      admin,
      collectionId,
      agentQuota,
      currentAuthConstraints: currentAuthZ.currentAuthConstraints,
      claimIds,
      maxAmounts,
    })

    const grantEvaluatorAuthZMessage = MsgGrantEntityAccountAuthz({
      ownerAddress,
      entityDid,
      granteeAddress,
      grant: evaluatorGrant,
    })

    if (ownerAddress === wallet?.address) {
      return execute({ data: { messages: [grantEvaluatorAuthZMessage], fee: fee, memo: undefined } })
    }

    const grantEvaluatorAuthZMessageWithAuthZExec = MsgExecAuthZ({
      grantee: wallet?.address ?? '',
      msgs: [
        {
          ...grantEvaluatorAuthZMessage,
          value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.encode(grantEvaluatorAuthZMessage.value).finish(),
        },
      ],
    })

    return execute({ data: { messages: [grantEvaluatorAuthZMessageWithAuthZExec], fee: fee, memo: undefined } })
  }

  const grantAgentAuthZ = async ({
    admin,
    collectionId,
    agentQuota,
    ownerAddress,
    entityDid,
    granteeAddress,
  }: {
    admin: string
    collectionId: string
    agentQuota: number
    ownerAddress: string
    entityDid: string
    granteeAddress: string
  }) => {
    const currentAuthZ = await getGranteeAuthConstraints({
      admin,
      grantee: granteeAddress,
      messageTypeUrl: '/ixo.claims.v1beta1.SubmitClaimAuthorization',
    })

    const agentGrant = SubmitClaimAuthorizationGrant({
      admin,
      collectionId,
      agentQuota,
      currentAuthConstraints: currentAuthZ.currentAuthConstraints,
    })

    const grantAgentAuthZMessage = MsgGrantEntityAccountAuthz({
      ownerAddress,
      entityDid,
      granteeAddress,
      grant: agentGrant,
    })

    if (ownerAddress === wallet?.address) {
      return execute({ data: { messages: [grantAgentAuthZMessage], fee: fee, memo: undefined } })
    }

    const grantAgentAuthZMessageWithAuthZExec = MsgExecAuthZ({
      grantee: wallet?.address ?? '',
      msgs: [
        {
          ...grantAgentAuthZMessage,
          value: ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.encode(grantAgentAuthZMessage.value).finish(),
        },
      ],
    })

    return execute({ data: { messages: [grantAgentAuthZMessageWithAuthZExec], fee: fee, memo: undefined } })
  }

  return { grantEvaluatorAuthZ, grantAgentAuthZ }
}
