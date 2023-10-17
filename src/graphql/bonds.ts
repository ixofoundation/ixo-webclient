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
    pollInterval: 1000 * 5,
  })

  return { loading, error, data: data?.bond, refetch }
}

// GET_BOND_BUYSELL_TRANSACTIONS
const GET_BOND_BUYSELL_TRANSACTIONS = gql`
  query GetBondBuySellTransactions($bondDid: String, $accountDid: String) {
    bondBuys(filter: { bondDid: { equalTo: $bondDid }, accountDid: { equalTo: $accountDid } }) {
      nodes {
        accountDid
        amount
        bondDid
        height
        id
        maxPrices
        nodeId
        timestamp
      }
    }
    bondSells(filter: { bondDid: { equalTo: $bondDid }, accountDid: { equalTo: $accountDid } }) {
      nodes {
        accountDid
        amount
        bondDid
        height
        id
        nodeId
        timestamp
      }
    }
  }
`

export function useGetBondTransactions(bondDid: string, accountDid?: string | null) {
  const { loading, error, data, refetch } = useQuery(GET_BOND_BUYSELL_TRANSACTIONS, {
    variables: { bondDid, accountDid },
    skip: !bondDid,
    pollInterval: 1000 * 5,
  })
  return {
    loading,
    error,
    data: [
      ...(data?.bondBuys?.nodes ?? []).map((v: any) => ({ ...v, type: 'buy' })),
      ...(data?.bondSells?.nodes ?? []).map((v: any) => ({ ...v, type: 'sell' })),
    ].sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime()
      const timestampB = new Date(b.timestamp).getTime()
      if (timestampA < timestampB) {
        return 1
      }
      return -1
    }),
    refetch,
  }
}

// GET_BOND_WITHDRAWALS
const GET_BOND_WITHDRAWALS = gql`
  query GetBondWithdrawals($bondDid: String, $accountDid: String) {
    reserveWithdrawals(filter: { bondDid: { equalTo: $bondDid }, withdrawerDid: { equalTo: $accountDid } }) {
      nodes {
        amount
        bondDid
        height
        id
        nodeId
        reserveWithdrawalAddress
        timestamp
        withdrawerAddress
        withdrawerDid
      }
    }
    shareWithdrawals(filter: { bondDid: { equalTo: $bondDid }, recipientDid: { equalTo: $accountDid } }) {
      nodes {
        amount
        bondDid
        height
        id
        nodeId
        recipientAddress
        recipientDid
        timestamp
      }
    }
  }
`

export function useGetBondWithdrawals(bondDid: string, accountDid: string) {
  const { loading, error, data, refetch } = useQuery(GET_BOND_WITHDRAWALS, {
    variables: { bondDid, accountDid },
    skip: !bondDid || !accountDid,
    pollInterval: 1000 * 5,
  })
  return {
    loading,
    error,
    data: [
      ...(data?.reserveWithdrawals?.nodes ?? []).map((v: any) => ({
        ...v,
        type: 'reserve',
        purpose: 'Share Withdrawal',
        description: '—',
      })),
      ...(data?.shareWithdrawals?.nodes ?? []).map((v: any) => ({
        ...v,
        type: 'share',
        purpose: 'Project Funding',
        description: '—',
      })),
    ].sort((a, b) => {
      const timestampA = new Date(a.timestamp).getTime()
      const timestampB = new Date(b.timestamp).getTime()
      if (timestampA < timestampB) {
        return 1
      }
      return -1
    }),
    refetch,
  }
}

// GET_BOND_ALPHAS
const GET_BOND_ALPHAS = gql`
  query GetBondAlphas($bondDid: String) {
    bondAlphas(filter: { bondDid: { equalTo: $bondDid } }) {
      nodes {
        alpha
        bondDid
        height
        id
        nodeId
        oracleDid
        timestamp
      }
    }
  }
`

export function useGetBondAlphas(bondDid: string) {
  const { loading, error, data, refetch } = useQuery(GET_BOND_ALPHAS, {
    variables: { bondDid },
    skip: !bondDid,
    pollInterval: 1000 * 5,
  })
  return {
    loading,
    error,
    data: (data?.bondAlphas.nodes ?? []).sort((a: any, b: any) => {
      const timestampA = new Date(a.timestamp).getTime()
      const timestampB = new Date(b.timestamp).getTime()
      if (timestampA < timestampB) {
        return 1
      }
      return -1
    }),
    refetch,
  }
}

// GET_BOND_ALPHAS
const GET_BOND_OUTCOMEPAYMENTS = gql`
  query GetOutcomePayments($bondDid: String) {
    outcomePayments(filter: { bondDid: { equalTo: $bondDid } }) {
      nodes {
        amount
        bondDid
        height
        id
        nodeId
        senderDid
        senderAddress
        timestamp
      }
    }
  }
`
export function useGetBondOutcomePayments(bondDid: string) {
  const { loading, error, data, refetch } = useQuery(GET_BOND_OUTCOMEPAYMENTS, {
    variables: { bondDid },
    skip: !bondDid,
    pollInterval: 1000 * 5,
  })
  return {
    loading,
    error,
    data: (data?.outcomePayments.nodes ?? []).sort((a: any, b: any) => {
      const timestampA = new Date(a.timestamp).getTime()
      const timestampB = new Date(b.timestamp).getTime()
      if (timestampA < timestampB) {
        return 1
      }
      return -1
    }),
    refetch,
  }
}
