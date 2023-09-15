import { FlexBox } from 'components/App/App.styles'
import { useCurrentEntityBondLinkedEntity } from 'hooks/currentEntity'
import React from 'react'
import BondStatistics from './BondStatistics'

const Overview: React.FC = () => {
  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''

  return (
    <FlexBox width='100%' direction='column'>
      <BondStatistics bondDid={bondDid} />
    </FlexBox>
  )
}

export default Overview
