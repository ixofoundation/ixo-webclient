import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'

const Outcomes: React.FC = () => {
  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <Typography variant='secondary' size='2xl'>
        Outcome Targets
      </Typography>
    </FlexBox>
  )
}

export default Outcomes
