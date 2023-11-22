import { gql, useQuery } from '@apollo/client'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { validateEntityDid } from 'utils/validation'

// GET_CLAIM_COLLECTION
const GET_CLAIM_COLLECTION = gql`
  query GetClaimCollection($collectionId: String!) {
    claimCollection(id: $collectionId) {
      id
      state
      startDate
      rejected
      quota
      protocol
      payments
      nodeId
      evaluated
      entity
      endDate
      disputed
      count
      approved
      admin
    }
  }
`
export function useGetClaimCollection(collectionId: string | number) {
  const { loading, error, data, refetch } = useQuery(GET_CLAIM_COLLECTION, {
    variables: { collectionId: String(collectionId) },
    skip: !collectionId,
    pollInterval: 5 * 1000,
  })
  return { loading, error, data: data?.claimCollection ?? {}, refetch }
}

export function useGetClaimTemplateEntityByCollectionId(collectionId: string | number) {
  const { data: claimCollection } = useGetClaimCollection(collectionId)
  const claimTemplateId = claimCollection.protocol
  const claimTemplateEntity = useAppSelector(selectEntityById(claimTemplateId))
  return claimTemplateEntity
}

// GET_CLAIM_COLLECTIONS
const GET_CLAIM_COLLECTIONS = gql`
  query GetClaimCollections {
    claimCollections {
      nodes {
        id
        state
        startDate
        rejected
        quota
        protocol
        payments
        nodeId
        evaluated
        entity
        endDate
        disputed
        count
        approved
        admin
      }
    }
  }
`
export function useGetClaimCollections() {
  const { loading, error, data, refetch } = useQuery(GET_CLAIM_COLLECTIONS)
  return { loading, error, data: data?.claimCollections?.nodes ?? [], refetch }
}

export function useGetClaimCollectionByEntityIdAndClaimTemplateId(params: { entityId: string; protocolId: string }) {
  const { entityId, protocolId } = params
  const { data: claimCollections } = useGetClaimCollections()
  return claimCollections
    .filter((collection: any) => collection.protocol === protocolId && collection.entity === entityId)
    .sort((a: any, b: any) => (Number(a.id) < Number(b.id) ? 1 : -1))[0]
}

// GET_CLAIM_COLLECTIONS_BY_ENTITYID
const GET_CLAIM_COLLECTIONS_BY_ENTITYID = gql`
  query GetClaimCollectionsByEntityId($entityId: String) {
    claimCollections(filter: { entity: { equalTo: $entityId } }) {
      nodes {
        id
        state
        startDate
        rejected
        quota
        protocol
        payments
        nodeId
        evaluated
        entity
        endDate
        disputed
        count
        approved
        admin
      }
      totalCount
    }
  }
`
export function useGetClaimCollectionsByEntityId(entityId: string) {
  const { loading, error, data, refetch } = useQuery(GET_CLAIM_COLLECTIONS_BY_ENTITYID, {
    variables: { entityId },
    skip: !validateEntityDid(entityId),
    pollInterval: 5 * 1000,
  })
  return {
    loading,
    error,
    data: data?.claimCollections.nodes ?? [],
    isExist: !!data?.claimCollections.totalCount,
    refetch,
  }
}

// GET_CLAIMS
const GET_CLAIMS = gql`
  query GetClaims($collectionId: String!) {
    claims(filter: { collectionId: { equalTo: $collectionId } }) {
      nodes {
        agentAddress
        agentDid
        claimId
        collectionId
        nodeId
        paymentsStatus
        schemaType
        submissionDate
        collection {
          admin
          approved
          count
          disputed
          endDate
          entity
          evaluated
          id
          nodeId
          payments
          protocol
          quota
          rejected
          startDate
          state
        }
        evaluationByClaimId {
          agentAddress
          agentDid
          amount
          claimId
          collectionId
          evaluationDate
          nodeId
          oracle
          reason
          status
          verificationProof
        }
      }
    }
  }
`
export function useGetClaims(collectionId: string | number) {
  const { loading, error, data, refetch } = useQuery(GET_CLAIMS, {
    variables: { collectionId: String(collectionId) },
    pollInterval: 5 * 1000,
  })

  return { loading, error, data: data?.claims?.nodes ?? [], refetch }
}

// GET_CLAIM
const GET_CLAIM = gql`
  query GetClaim($claimId: String!) {
    claim(claimId: $claimId) {
      agentAddress
      agentDid
      claimId
      collectionId
      nodeId
      paymentsStatus
      schemaType
      submissionDate
      collection {
        admin
        approved
        count
        disputed
        entity
        endDate
        evaluated
        id
        nodeId
        payments
        protocol
        quota
        rejected
        startDate
        state
      }
      evaluationByClaimId {
        agentAddress
        agentDid
        amount
        claimId
        collectionId
        evaluationDate
        nodeId
        reason
        oracle
        status
        verificationProof
      }
    }
  }
`
export function useGetClaim(claimId: string) {
  const { loading, error, data, refetch } = useQuery(GET_CLAIM, {
    variables: { claimId: claimId },
    skip: !claimId,
    pollInterval: 5 * 1000,
  })

  return { loading, error, data: data?.claim, refetch }
}

export function useGetClaimTemplateEntityByClaimId(claimId: string) {
  const { data: claim } = useGetClaim(claimId)
  const collectionId = claim?.collection?.id || ''
  const { data: claimCollection } = useGetClaimCollection(collectionId)
  const claimTemplateId = claimCollection.protocol
  const claimTemplateEntity = useAppSelector(selectEntityById(claimTemplateId))
  return claimTemplateEntity
}
