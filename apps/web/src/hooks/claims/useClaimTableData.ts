import { transformStorageEndpoint } from '@ixo-webclient/utils'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useClaimCollectionsWithClaimsQuery, useEntitiesLazyQuery } from 'generated/graphql'
import { useEffect, useState } from 'react'

export const useClaimTableData = ({ entityId }: { entityId: string }) => {
  const { wallet } = useWallet()
  const [claimTableData, setClaimTableData] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])

  const { loading } = useClaimCollectionsWithClaimsQuery({
    variables: {
      filter: {
        entity: {
          equalTo: entityId,
        },
        state: {
          equalTo: 0
        }
      },
      claimsByCollectionIdFilter: {
        agentDid: {
          equalTo: wallet?.did,
        },
      },
    },
    onCompleted: (data) => {
      setCollections(data.claimCollections?.nodes ?? [])
    },
  })

  const [fetchEntities] = useEntitiesLazyQuery()

  useEffect(() => {
    if (collections.length > 0) {
      const protocolIds = collections.map((collection) => collection.protocol).filter(Boolean) as string[]

      fetchEntities({ variables: { filter: { id: { in: protocolIds } } } })
        .then(async (response) => {
          const entityProfilePromises = await Promise.all(
            (response.data?.entities?.nodes ?? []).map(async (entity: any) => {
              const response = await fetch(transformStorageEndpoint(entity.settings['Profile']?.serviceEndpoint)).then(
                (response) => response.json(),
              )
              return { ...response, did: entity.id }
            }),
          )

          setClaimTableData(
            Object.values(collections.reduce((acc, collection) => {
              // Check if this protocol already exists in the accumulator
              if (!acc[collection.protocol] || acc[collection.protocol].id < collection.id) {
                // If it doesn't exist or the current collection has a higher ID, update the accumulator
                acc[collection.protocol] = collection;
              }
              return acc;
            }, {})).map((collection: any) => ({
              collection,
              profile: entityProfilePromises.find(profile => profile.did === collection.protocol),
              lastClaim: collection.claimsByCollectionId.nodes?.length > 0 ? collection.claimsByCollectionId.nodes[0] : null
            })) as any[],
          )
        })
        .catch((error: any) => {
          // Handle error
          console.error('Error fetching entities:', error)
        })
    }
  }, [collections, fetchEntities])

  return { claimTableData, loading }
}
