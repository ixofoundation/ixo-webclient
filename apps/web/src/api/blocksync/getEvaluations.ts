import {
  ClaimCollection,
  ClaimCollectionFilter,
  ClaimCollectionsDocument,
  Evaluation,
  EvaluationFilter,
  EvaluationsDocument,
  GetTokensTotalForCollectionAmountsDocument,
} from 'generated/graphql'
import { gqlClient } from 'index'

export const getEvaluations = async ({filter} :{filter: EvaluationFilter}) => {
  try {
    const { data } = await gqlClient.query({
      query: EvaluationsDocument,
      variables: { filter },
    })
    return data.evaluations
  } catch (error) {
    console.error('Error fetching evaluations:', error)
    throw error
  }
}

export const getclaimsCollections = async ({ filter }: { filter: ClaimCollectionFilter }) => {
  try {
    const { data } = await gqlClient.query({
      query: ClaimCollectionsDocument,
      variables: { filter },
    })
    return data.claimCollections
  } catch (error) {
    console.error('Error fetching claim collections:', error)
    throw error
  }
}

export const getTokensTotalForCollectionAmounts = async ({ did }: { did: string }) => {
  try {
    const { data } = await gqlClient.query({
      query: GetTokensTotalForCollectionAmountsDocument,
      variables: { did },
    })
    return data.getTokensTotalForCollectionAmounts
  } catch (error) {
    console.error('Error fetching claim collections:', error)
    throw error
  }
}

export const getCarbonOracleAggregate = async ({ entityId }: { entityId: string }) => {
  let minted = 0,
    retired = 0

  const evaluations = await getEvaluations({ filter: { oracle: { equalTo: entityId } }})


  const claimCollections = await getclaimsCollections({ filter: { id: { in: evaluations?.nodes.map((evaluation: Evaluation) => evaluation?.collectionId) } } })


  const oracleCollectionIds =
    claimCollections?.nodes.map((collection: ClaimCollection) => collection.entity) ?? []


  for await (const collectionId of oracleCollectionIds) {
    const results = await getTokensTotalForCollectionAmounts({ did: collectionId })

    minted = minted + (results?.CARBON?.minted ?? 0)
    retired = retired + (results?.CARBON?.retired ?? 0)
  }
//   oracleCollectionIds.forEach(async (collectionId: string) => {
//     const results = await getTokensTotalForCollectionAmounts({ did: collectionId })

//     minted = minted + (results.data?.CARBON?.minted ?? 0)
//     retired = retired + (results.data?.CARBON?.retired ?? 0)
//   })

  const totalEvaluatedClaims = claimCollections?.nodes.reduce((acc: any, collection: any) => {
      return acc + collection.evaluated
    }, 0) ?? 0

  const claimsApproved =claimCollections?.nodes.reduce((acc: any, collection: any) => {
      return acc + collection.approved
    }, 0) ?? 0

  const approvedPercentage = (claimsApproved / (totalEvaluatedClaims ?? 0)) * 100

  return { minted, totalEvaluatedClaims, approvedPercentage}
}
