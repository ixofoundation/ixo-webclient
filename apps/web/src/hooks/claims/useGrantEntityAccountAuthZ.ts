import { useWallet } from '@ixo-webclient/wallet-connector'
import { createRegistry } from '@ixo/impactxclient-sdk'
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

  const hasAuthZ = async ({owner, messageTypeUrl} :{owner: string, messageTypeUrl: string}) => {
    const queryClient = await getQueryClient(RPC_ENDPOINT)
    const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
      grantee: wallet?.address ?? '',
    })

    const evaluateAuth = granteeGrants.grants.find(
      (g) => g.authorization?.typeUrl === messageTypeUrl && g.granter === owner,
    )

    const registry = createRegistry()
    const currentAuthConstraints = evaluateAuth === undefined ? [] : registry.decode(evaluateAuth!.authorization!).constraints

    return { hasAuthZ: evaluateAuth , currentAuthConstraints }
  }

  const grantEvaluatorAuthZ = async ({
    agentQuota,
    admin,
    claimIds,
    collectionId,
    currentAuthConstraints,
    ownerAddress,
    entityDid,
    granteeAddress,
  }: {
    agentQuota: number
    admin: string
    claimIds: string[]
    collectionId: string
    currentAuthConstraints: any
    ownerAddress: string
    entityDid: string
    granteeAddress: string
  }) => {
    const evaluatorGrant = EvaluateClaimAuthorizationGrant({
      admin,
      collectionId,
      agentQuota,
      currentAuthConstraints,
      claimIds,
    })

    const grantEvaluatorAuthZMessage = MsgGrantEntityAccountAuthz({
      ownerAddress,
      entityDid,
      granteeAddress,
      grant: evaluatorGrant,
    })

    if(ownerAddress === wallet?.address){
      return execute({ data: { messages: [grantEvaluatorAuthZMessage], fee: fee, memo: undefined }})
    }

    const currentAuthZ = await hasAuthZ({owner: ownerAddress, messageTypeUrl: '/ixo.claims.v1beta1.EvaluateClaimAuthorization' })

    if(currentAuthZ.hasAuthZ){
      const grantEvaluatorAuthZMessageWithAuthZExec = MsgExecAuthZ({
        grantee: granteeAddress,
        msgs: [grantEvaluatorAuthZMessage],
      })

      return execute({ data: { messages: [grantEvaluatorAuthZMessageWithAuthZExec], fee: fee, memo: undefined }})
    }

    return undefined
  }

  const grantAgentAuthZ = async ({
    admin,
    collectionId,
    agentQuota,
    currentAuthConstraints,
    ownerAddress,
    entityDid,
    granteeAddress,
  }: {
    admin: string
    collectionId: string
    agentQuota: number
    currentAuthConstraints: any
    ownerAddress: string
    entityDid: string
    granteeAddress: string
  }) => {
    const agentGrant = SubmitClaimAuthorizationGrant({
      admin,
      collectionId,
      agentQuota,
      currentAuthConstraints,
    })

    const grantAgentAuthZMessage = MsgGrantEntityAccountAuthz({
      ownerAddress,
      entityDid,
      granteeAddress,
      grant: agentGrant,
    })

    if(ownerAddress === wallet?.address){
      return execute({ data: { messages: [grantAgentAuthZMessage], fee: fee, memo: undefined }})
    }

    const currentAuthZ = await hasAuthZ({owner: ownerAddress, messageTypeUrl: '/ixo.claims.v1beta1.SubmitClaimAuthorization'})

    if(currentAuthZ.hasAuthZ){
      const grantAgentAuthZMessageWithAuthZExec = MsgExecAuthZ({
        grantee: granteeAddress,
        msgs: [grantAgentAuthZMessage],
      })

      return execute({ data: { messages: [grantAgentAuthZMessageWithAuthZExec], fee: fee, memo: undefined }})
    }

    return undefined
  }

  return { grantEvaluatorAuthZ, grantAgentAuthZ }
}
