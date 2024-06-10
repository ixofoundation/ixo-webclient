import { useWallet } from '@ixo-webclient/wallet-connector'
import { RPC_ENDPOINT, fee } from 'lib/protocol'
import { getQueryClient } from 'lib/queryClient'
import {
  MsgCreateCollection,
  MsgCreateCollectionProps,
  MsgCreateCollectionWithAuthZ,
  MsgCreateCollectionWithAuthZProps,
} from 'messages'
import {
  EvaluateClaimAuthorizationGrant,
  EvaluateClaimAuthorizationGrantProps,
  SubmitClaimAuthorizationGrant,
  SubmitClaimAuthorizationGrantProps,
} from 'messages/claims/MsgGrantEntityAccountAuthz'

type CreateClaimCollectionProps = {
  entity: {
    id: string
    owner: string
  }
  payload: Omit<MsgCreateCollectionProps, 'signer' | 'entity'>
}

export const useGrantEntityAccountAuthZ = () => {
  const { wallet, execute } = useWallet()

  const isSignerEntityOwner = (owner: string) => {
    if (!wallet?.address || !owner) {
      throw Error('Invalid parameters')
    }
    if (wallet.address === owner) {
      return true
    }
    return false
  }

  const hasAuthZ = async (owner: string) => {
    const queryClient = await getQueryClient(RPC_ENDPOINT)
    const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
      grantee: wallet?.address ?? '',
    })

    const evaluateAuth = granteeGrants.grants.find(
      (g) => g.authorization?.typeUrl === '/cosmos.authz.v1beta1.GenericAuthorization' && g.granter === owner,
    )

    if (evaluateAuth === undefined) return false
    return true
  }

  const grantEvaluatorAuthZ = async ({
    agentQuota,
    admin,
    claimIds,
    collectionId,
    currentAuthConstraints,
  }: EvaluateClaimAuthorizationGrantProps) => {
   const message = EvaluateClaimAuthorizationGrant({
      admin,
      collectionId,
      agentQuota,
      currentAuthConstraints,
      claimIds,
    })
  }

  const grantAgentAuthZ = async ({ admin, agentQuota, collectionId, currentAuthConstraints}:SubmitClaimAuthorizationGrantProps) => {
    const message = SubmitClaimAuthorizationGrant({
        admin,
        collectionId,
        agentQuota,
        currentAuthConstraints,
    })
  }
}
