import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import AlphaHistory from './AlphaHistory'

interface Props {
  bondDid: string
}

const BondAlphaSection: React.FC<Props> = ({ bondDid }) => {
  return (
    <FlexBox $direction='column' width='100%' $gap={6}>
      <Typography size='lg'>Alpha History</Typography>
      <AlphaHistory bondDid={bondDid} />
    </FlexBox>
  )
}

export default BondAlphaSection
