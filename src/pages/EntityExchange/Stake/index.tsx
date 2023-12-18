import { FlexBox } from 'components/App/App.styles'
import React from 'react'
import Tokenomics from './Tokenomics'
import Validators from './Validators'

const EntityExchangeStake: React.FC = () => {
  return (
    <FlexBox width='100%' direction='column' gap={4}>
      <FlexBox width='100%' justifyContent='flex-end'>
        <Tokenomics />
      </FlexBox>
      <FlexBox width='100%'>
        <Validators />
      </FlexBox>
    </FlexBox>
  )
}

export default EntityExchangeStake
