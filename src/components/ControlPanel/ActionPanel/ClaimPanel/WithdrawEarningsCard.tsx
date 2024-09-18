import { Badge, Box, Button, Flex, Text } from '@mantine/core'
import { Claim } from 'generated/graphql'
import { findDenomByMinimalDenom, minimalDenomToDenom } from 'redux/account/account.utils'

interface Totals {
  [denom: string]: number
}

function initializeTotals(payments: any): Totals {
  const totals: Totals = {}
  Object.keys(payments).forEach((status) => {
    payments[status].amount.forEach((coin: any) => {
      if (!totals[coin.denom]) {
        totals[coin.denom] = 0
      }
    })
  })
  return totals
}

function calculateTotals(nodes: Claim[], payments: any) {
  const totalEarned: Totals = initializeTotals(payments)
  const totalDue: Totals = initializeTotals(payments)

  nodes.forEach((node) => {
    Object.keys(node.paymentsStatus ?? {}).forEach((status) => {
      if (status === 'evaluation') return // Skip evaluation status

      const statusValue = node.paymentsStatus ? node.paymentsStatus[status as keyof Claim['paymentsStatus']] : undefined
      const paymentDetail = payments[status as keyof any]

      if (paymentDetail) {
        paymentDetail.amount.forEach((coin: any) => {
          const amount = parseInt(coin.amount, 10)
          const denom = coin.denom

          if (statusValue === 'PAID' || statusValue === 'AUTHORIZED') {
            totalEarned[denom] += amount
          }

          if (statusValue === 'AUTHORIZED') {
            totalDue[denom] += amount
          }
        })
      }
    })
  })

  return { totalEarned, totalDue }
}

const WithdrawEarningsCard = ({ data }: { data: any }) => {
  const { totalEarned, totalDue } = calculateTotals(
    data.collection?.claimsByCollectionId?.nodes,
    data.collection?.payments,
  )

  const totalDueAmount = Object.values(totalDue).reduce((acc, curr) => acc + curr, 0)
  const totalEarnedAmount = Object.values(totalEarned).reduce((acc, curr) => acc + curr, 0) 

  if (totalDueAmount === 0 && totalEarnedAmount === 0) {
    return null
  }
  return (
    <Box mt={15} bg='#fff' p={20} style={{ borderRadius: 12 }}>
      <Text>My Claim Payments</Text>
      <Flex direction={'column'} gap={10} mt={"md"}>
        {Object.keys(totalDue).map((denom) => (
          <Flex key={denom} justify={'space-between'}>
            <Flex align={"center"}>
              <Text>Total Due</Text>
              <Badge ml={4}>{findDenomByMinimalDenom(denom)}</Badge>
            </Flex>
            <Text>{minimalDenomToDenom(denom, totalDue[denom])}</Text>
          </Flex>
        ))}
        {Object.keys(totalEarned).map((denom) => (
          <Flex key={denom} justify={'space-between'}>
            <Flex align={"center"}>
              <Text>Total Earned</Text>
              <Badge ml={4}>{findDenomByMinimalDenom(denom)}</Badge>
            </Flex>
            <Text>{minimalDenomToDenom(denom, totalEarned[denom])}</Text>
          </Flex>
        ))}
      </Flex>

      <Button mt={15} w='100%' disabled={totalDueAmount === 0}>
        Withdraw
      </Button>
    </Box>
  )
}

export default WithdrawEarningsCard
