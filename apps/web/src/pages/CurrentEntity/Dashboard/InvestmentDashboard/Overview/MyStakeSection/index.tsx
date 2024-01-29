import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import React from 'react'
import MyStakeCharts from './MyStakeCharts'
import MyStakeTransactions from './MyStakeTransactions'

interface Props {
  bondDid: string
}

const MyStakeSection: React.FC<Props> = ({ bondDid }) => {
  const { data: bondDetail } = useGetBondDid(bondDid)

  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <Typography size='lg'>My {bondDetail?.token?.toUpperCase()} Stake</Typography>

      <MyStakeCharts bondDid={bondDid} />

      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <Typography size='lg'>{bondDetail?.token?.toUpperCase()} Transactions</Typography>
      </FlexBox>

      <MyStakeTransactions bondDid={bondDid} />
    </FlexBox>
  )
}

export default MyStakeSection
