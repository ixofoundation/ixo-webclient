import {
  useClaimCollectionsQuery,
  useEvaluationsQuery,
  useGetTokensTotalForCollectionAmountsLazyQuery,
} from 'generated/graphql'
import { useEffect, useMemo, useState } from 'react'

export const useCarbonOracleClaimAggregate = ({ entityIds }: { entityIds: string[] }) => {
  const [{ minted }, setEvaluationMetrics] = useState<{ minted: number; retired: number }>({
    minted: 0,
    retired: 0,
  })

  const { data: evaluationsData } = useEvaluationsQuery({
    variables: {
      filter: {
        oracle: {
          in: entityIds,
        },
      },
    },
  })

  const { data: claimCollectionData } = useClaimCollectionsQuery({
    variables: {
      filter: {
        id: {
          in: evaluationsData?.evaluations?.nodes.map((evaluation) => evaluation?.collectionId),
        },
      },
    },
  })

  const oracleCollectionIds = useMemo(() => {
    return claimCollectionData?.claimCollections?.nodes.map((collection) => collection.entity) ?? []
  }, [claimCollectionData?.claimCollections?.nodes])

  const [getTotalTokens] = useGetTokensTotalForCollectionAmountsLazyQuery()

  useEffect(() => {
    if (oracleCollectionIds.length > 0) {
      oracleCollectionIds.forEach(async (collectionId) => {
        const results = await getTotalTokens({ variables: { did: collectionId } })
        setEvaluationMetrics((prev) => {
          return {
            minted: prev.minted + (results.data?.getTokensTotalForCollectionAmounts?.CARBON?.minted ?? 0),
            retired: prev.retired + (results.data?.getTokensTotalForCollectionAmounts?.CARBON?.retired ?? 0),
          }
        })
      })
    }
  }, [oracleCollectionIds, getTotalTokens])

  const totalEvaluatedClaims = useMemo(() => {
    return (
      claimCollectionData?.claimCollections?.nodes.reduce((acc, collection) => {
        return acc + collection.evaluated
      }, 0) ?? 0
    )
  }, [claimCollectionData?.claimCollections?.nodes])

  const claimsApproved = useMemo(() => {
    return (
      claimCollectionData?.claimCollections?.nodes.reduce((acc, collection) => {
        return acc + collection.approved
      }, 0) ?? 0
    )
  }, [claimCollectionData?.claimCollections?.nodes])

  const approvedPercentage = useMemo(() => {
    return (claimsApproved / (totalEvaluatedClaims ?? 0)) * 100
  }, [claimsApproved, totalEvaluatedClaims])

  return {
    evaluationsData,
    claimCollectionData,
    oracleCollectionIds,
    totalEvaluatedClaims,
    claimsApproved,
    approvedPercentage,
    minted,
  }
}
