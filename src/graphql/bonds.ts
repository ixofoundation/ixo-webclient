import { gql, useQuery } from '@apollo/client'

// GET_BOND_DID
const GET_BOND_DID = gql`
  query GetBondDid($bondDid: String!) {
    bond(bondDid: $bondDid) {
      allowReserveWithdrawals
      allowSells
      alphaBond
      availableReserve
      batchBlocks
      bondDid
      controllerDid
      creatorDid
      currentOutcomePaymentReserve
      currentReserve
      currentSupply
      description
      exitFeePercentage
      feeAddress
      functionParameters
      functionType
      maxSupply
      name
      nodeId
      oracleDid
      orderQuantityLimits
      outcomePayment
      reserveTokens
      reserveWithdrawalAddress
      sanityMarginPercentage
      sanityRate
      state
      token
      txFeePercentage
    }
  }
`
export function useGetBondDid(bondDid: string | undefined) {
  const { loading, error, data, refetch } = useQuery(GET_BOND_DID, {
    variables: { bondDid },
    skip: !bondDid,
  })
  return { loading, error, data: data?.bond, refetch }
}
