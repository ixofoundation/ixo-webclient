import { gql, useQuery } from '@apollo/client'

// GET_USER_IIDS
const GET_USER_IIDS = gql`
  query GetUserIids {
    iids(filter: { alsoKnownAs: { equalTo: "user" } }) {
      nodes {
        id
        service
        linkedClaim
        linkedEntity
        linkedResource
        verificationMethod
        nodeId
        metadata
        keyAgreement
        controller
        context
        capabilityInvocation
        capabilityDelegation
        authentication
        assertionMethod
        alsoKnownAs
        accordedRight
      }
    }
  }
`
export function useGetUserIids() {
  const { loading, error, data, refetch } = useQuery(GET_USER_IIDS, {
    pollInterval: 1000 * 5,
  })

  return { loading, error, data: data?.iids?.nodes ?? [], refetch }
}

export function useGetJoiningAgentsByCollectionId(collectionId: string) {
  const { data: users } = useGetUserIids()

  return users.filter((user: any) =>
    user.linkedResource.some((item: any) => item.description.split('#')[0] === collectionId),
  )
}

// GET_IID
const GET_IID = gql`
  query GetIid($id: String!) {
    iid(id: $id) {
      linkedEntity
      id
      linkedResource
      verificationMethod
      service
      nodeId
      metadata
      linkedClaim
      keyAgreement
      controller
      context
      capabilityInvocation
      capabilityDelegation
      authentication
      assertionMethod
      alsoKnownAs
      accordedRight
    }
  }
`
export function useGetIid(id: string) {
  const { loading, error, data, refetch } = useQuery(GET_IID, {
    variables: { id },
    skip: !id,
    pollInterval: 1000 * 5,
  })

  return { loading, error, data: data?.iid, refetch }
}
