import { FlexBox } from 'components/App/App.styles'
import { useCurrentEntityBondLinkedEntity } from 'hooks/currentEntity'
import React from 'react'
import { useHistory } from 'react-router-dom'
import BondAlphaSection from './BondAlphaSection'
import BondPriceSection from './BondPriceSection'
import BondReserveFundsSection from './BondReserveFundsSection'
import BondStatistics from './BondStatistics'
import MyStakeSection from './MyStakeSection'

const Overview: React.FC = () => {
  const history = useHistory()
  const tab = history.location.hash.replace('#', '')
  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''

  return (
    <FlexBox width='100%' direction='column' gap={8}>
      <BondStatistics bondDid={bondDid} />
      {tab === 'price' && <BondPriceSection bondDid={bondDid} />}
      {tab === 'my_stake' && <MyStakeSection bondDid={bondDid} />}
      {tab === 'reserve_funds' && <BondReserveFundsSection bondDid={bondDid} />}
      {tab === 'alpha' && <BondAlphaSection bondDid={bondDid} />}
    </FlexBox>
  )
}

export default Overview
