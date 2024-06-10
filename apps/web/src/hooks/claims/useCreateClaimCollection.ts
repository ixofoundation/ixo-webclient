import { useWallet } from '@ixo-webclient/wallet-connector'
import { RPC_ENDPOINT, fee } from 'lib/protocol'
import { getQueryClient } from 'lib/queryClient'
import { MsgCreateCollection, MsgCreateCollectionProps, MsgCreateCollectionWithAuthZ, MsgCreateCollectionWithAuthZProps } from 'messages'

type CreateClaimCollectionProps = {
  entity: {
    id: string
    owner: string
  }
  payload: Omit<MsgCreateCollectionProps, 'signer' | 'entity'>
}
export const useCreateClaimCollection = () => {
  const { wallet, execute } = useWallet()

  const isSignerEntityOwner = (owner: string) => {
    if (!wallet?.address || !owner) {
      throw 'Invalid parameters'
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

  const prepareMessageForAuthZExecution = ({
    signer,
    entity,
    protocol,
    startDate,
    endDate,
    quota,
    payments,
    grantee
  }: MsgCreateCollectionWithAuthZProps) => {
    return MsgCreateCollectionWithAuthZ({
      signer,
      entity,
      protocol,
      startDate,
      endDate,
      quota,
      payments,
      grantee,
    })
  }

  const prepareMessageForOwner = ({
    signer,
    entity,
    protocol,
    startDate,
    endDate,
    quota,
    payments,
  }: MsgCreateCollectionProps) => {
    return MsgCreateCollection({
      signer,
      entity,
      protocol,
      startDate,
      endDate,
      quota,
      payments,
    })
  }

  const createClaimCollection = async ({
    entity,
    payload: { protocol, startDate, endDate, quota, payments },
  }: CreateClaimCollectionProps) => {
    if (wallet?.address === undefined) throw new Error('Sign into wallet')

    const isOwner = isSignerEntityOwner(entity.owner)
    if (isOwner) {
      const message = prepareMessageForOwner({
        signer: wallet?.address,
        entity: entity.id,
        protocol,
        startDate,
        endDate,
        quota,
        payments,
      })

      return await execute({ data: { messages: [message], fee, memo: undefined } })
    }
    const authZGranted = await hasAuthZ(entity.owner)
    if (authZGranted) {
      const message = prepareMessageForAuthZExecution({
        signer: entity.owner,
        entity: entity.id,
        protocol,
        startDate,
        endDate,
        quota,
        payments,
        grantee: wallet?.address,
      })

      return await execute({ data: { messages: [message], fee, memo: undefined } })
    }
  }

  return createClaimCollection
}
