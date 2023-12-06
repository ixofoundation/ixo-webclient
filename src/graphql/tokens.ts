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

// GET_TOKENOMICS
const GET_TOKENOMICS = gql`
  query GetTokenomics {
    tokenomicsInflation
    tokenomicsSupplyCommunityPool
    tokenomicsSupplyStaked
    tokenomicsSupplyTotal
  }
`
export function useGetTokenomics() {
  const { loading, error, data, refetch } = useQuery(GET_TOKENOMICS)
  return {
    loading,
    error,
    data: {
      tokenomicsInflation: data?.tokenomicsInflation ?? 0,
      tokenomicsSupplyStaked: data?.tokenomicsSupplyStaked ?? {
        notBondedTokens: '0',
        bondedTokens: '0',
      },
    },
    refetch,
  }
}
