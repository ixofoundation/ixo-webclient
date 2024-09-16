import { transformStorageEndpoint } from '@ixo-webclient/utils'
import { useWallet } from 'wallet-connector'
import { useClaimCollectionsWithClaimsQuery, useEntitiesLazyQuery } from 'generated/graphql'
import { useEffect, useState, useMemo } from 'react'
import { coinsToUsd } from 'services/currency'

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
          equalTo: 0,
        },
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
              console.log('service endpoint', entity.settings['Profile']?.serviceEndpoint)
              const serviceEndpoint = transformStorageEndpoint(entity.settings['Profile']?.serviceEndpoint)
              console.log('service endpoint', serviceEndpoint)
              if (serviceEndpoint) {
                const response = await fetch(serviceEndpoint).then((response) => response.json())
                return { ...response, did: entity.id }
              }
              return null
            }),
          )

          setClaimTableData(
            Object.values(
              collections.reduce((acc, collection) => {
                // Check if this protocol already exists in the accumulator
                if (!acc[collection.protocol] || acc[collection.protocol].id < collection.id) {
                  // If it doesn't exist or the current collection has a higher ID, update the accumulator
                  acc[collection.protocol] = collection
                }
                return acc
              }, {}),
            ).map((collection: any) => ({
              collection,
              profile: entityProfilePromises.find((profile) => profile?.did === collection.protocol),
              lastClaim:
                collection.claimsByCollectionId.nodes?.length > 0 ? collection.claimsByCollectionId.nodes[0] : null,
            })) as any[],
          )
        })
        .catch((error: any) => {
          // Handle error
          console.error('Error fetching entities:', error)
        })
    }
  }, [collections, fetchEntities])

  const totals = useMemo(async () => {
    const totals = await claimTableData.reduce(
      async (accPromise, curr) => {
        const acc = await accPromise
        const quota = curr.collection.quota
        const amountPerQuota = await coinsToUsd(curr.collection.payments.approval.amount) // Divide by 1,000,000
        const claimed = curr.collection.count

        acc.total.count += quota
        acc.total.reward += quota * amountPerQuota
        acc.available.count += quota - claimed
        acc.available.reward += (quota - claimed) * amountPerQuota

        return acc
      },
      Promise.resolve({ total: { count: 0, reward: 0 }, available: { count: 0, reward: 0 } }),
    )
    return totals
  }, [claimTableData])

  const [computedTotals, setComputedTotals] = useState({
    total: { count: 0, reward: 0 },
    available: { count: 0, reward: 0 },
  })

  useEffect(() => {
    totals.then(setComputedTotals)
  }, [totals])

  return { claimTableData, loading, totals: computedTotals }
}
