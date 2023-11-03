import { gql, useQuery } from '@apollo/client'

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
