import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { ParticipationActivity } from './ParticipationActivity'
import { ParticipationStatus } from './ParticipationStatus'

interface Props {
  selectedDao: string
}

const DAOParticipation: React.FC<Props> = ({ selectedDao }): JSX.Element => {
  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <Typography weight='medium' size='3xl'>
        Participation in {selectedDao}
      </Typography>

      <ParticipationStatus authority={12.54} participationRate={23} votingPower={0.43} proposals={311} />

      <ParticipationActivity />
    </FlexBox>
  )
}

export default DAOParticipation
