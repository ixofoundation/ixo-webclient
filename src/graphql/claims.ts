import { gql, useQuery } from '@apollo/client'
import { useEntityQuery } from 'generated/graphql'
import { useMemo, useState } from 'react'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityModel } from 'types/entities'
import { apiEntityToEntity } from 'utils/entities'
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
  const [claimTemplateEntity, setClaimTemplateEntity] = useState<TEntityModel | undefined>(undefined)

  useEntityQuery({
    variables: {
      id: claimTemplateId,
    },
    onCompleted: (data) => {
      setClaimTemplateEntity(data?.entity as any)
      apiEntityToEntity({ entity: data?.entity }, (key, value) => {
        setClaimTemplateEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    },
  })
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
    claimCollections(filter: { entity: { equalTo: $entityId } }, orderBy: ID_DESC) {
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
  const entity = useAppSelector(getEntityById(entityId))
  const { loading, error, data, refetch } = useQuery(GET_CLAIM_COLLECTIONS_BY_ENTITYID, {
    variables: { entityId },
    skip: !validateEntityDid(entityId),
    pollInterval: 5 * 1000,
  })

  const claimProtocols = useMemo(
    () =>
      Object.values(entity?.claim ?? {})
        .map((v) => v.template?.id.split('#')[0] ?? '')
        .filter(Boolean),
    [entity?.claim],
  )
  const collections = useMemo(() => {
    const collections: any[] = []
    claimProtocols.forEach((v) => {
      const collectionCreated = (data?.claimCollections.nodes ?? []).find((node: any) => node.protocol === v)
      if (collectionCreated) {
        collections.push(collectionCreated)
      }
    })
    return collections
  }, [claimProtocols, data])

  return {
    loading,
    error,
    data: collections,
    isExist: collections.length > 0,
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

// GET_CLAIMS_BY_ENTITYID
const GET_CLAIMS_BY_ENTITYID = gql`
  query GetClaimsByEntityId($collectionIds: [String!]) {
    claims(filter: { collectionId: { in: $collectionIds } }) {
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
export function useGetClaimsByEntityId(entityId: string) {
  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)

  const { loading, error, data, refetch } = useQuery(GET_CLAIMS_BY_ENTITYID, {
    variables: { collectionIds: claimCollections.map((v) => v.id) },
    pollInterval: 5 * 1000,
  })

  if (data?.claims?.nodes?.length === 0) {
    return {
      loading,
      error,
      data: [],
      refetch,
    }
  }

  const sortedClaims = [...(data?.claims?.nodes ?? [])].sort(
    (a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime(),
  )

  return {
    loading,
    error,
    data: sortedClaims,
    refetch,
  }
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
  const [claimTemplateEntity, setClaimTemplateEntity] = useState<TEntityModel | undefined>(undefined)
  useEntityQuery({
    variables: {
      id: claimTemplateId,
    },
    onCompleted: (data) => {
      setClaimTemplateEntity(data?.entity as any)
      apiEntityToEntity({ entity: data?.entity }, (key, value) => {
        setClaimTemplateEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    },
  })
  return claimTemplateEntity
}
