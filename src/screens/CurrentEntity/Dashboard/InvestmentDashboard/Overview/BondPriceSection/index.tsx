import { FlexBox } from 'components/CoreEntry/App.styles'
import BondBuyModal from 'components/Modals/BondBuyModal'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import { Button } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import BondPrices from './BondPrices'
import BondTransactions from './BondTransactions'

interface Props {
  bondDid: string
}
const BondPriceSection: React.FC<Props> = ({ bondDid }) => {
  const { data: bondDetail } = useGetBondDid(bondDid)

  const [buyModalOpen, setBuyModalOpen] = useState(false)

  const onBuyClick = () => {
    setBuyModalOpen(true)
  }

  return (
    <FlexBox width='100%' $direction='column' $gap={6}>
      <Typography size='lg'>Price of {bondDetail?.token?.toUpperCase()}</Typography>

      <BondPrices bondDid={bondDid} />

      <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
        <Typography size='lg'>{bondDetail?.token?.toUpperCase()} Orders</Typography>
        <Button variant='secondary' onClick={onBuyClick}>
          Buy
        </Button>
      </FlexBox>

      <BondTransactions bondDid={bondDid} />

      <BondBuyModal bondDid={bondDid} open={buyModalOpen} setOpen={setBuyModalOpen} />
    </FlexBox>
  )
}

export default BondPriceSection
