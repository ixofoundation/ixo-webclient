import { gql, useQuery } from '@apollo/client'
import { isAccountAddress } from 'utils/validation'

// GET_ACCOUNT_TOKENS
const GET_ACCOUNT_TOKENS = gql`
  query GetAccountTokens($address: String!) {
    getAccountTokens(address: $address)
  }
`
export function useGetAccountTokens(address: string) {
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNT_TOKENS, {
    variables: { address },
    skip: !isAccountAddress(address),
  })
  return { loading, error, data: data?.getAccountTokens ?? {}, refetch }
}
