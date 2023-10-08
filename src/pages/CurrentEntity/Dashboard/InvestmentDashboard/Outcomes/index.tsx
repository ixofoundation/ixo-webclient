import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useCurrentEntityBondLinkedEntity } from 'hooks/currentEntity'
import React from 'react'
import OutcomePayments from './OutcomePayments'

const Outcomes: React.FC = () => {
  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''

  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <Typography variant='secondary' size='2xl'>
        Outcome Targets
      </Typography>

      <Typography variant='secondary' size='2xl'>
        Outcome Payments
      </Typography>
      <OutcomePayments bondDid={bondDid} />
    </FlexBox>
  )
}

export default Outcomes
