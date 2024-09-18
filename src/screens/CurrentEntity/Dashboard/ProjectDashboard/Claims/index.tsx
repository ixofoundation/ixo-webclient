import { FlexBox } from 'components/CoreEntry/App.styles'
import React from 'react'
import ClaimCollectionCreation from './ClaimCollectionCreation'

const Claims: React.FC = () => {
  return (
    <FlexBox $direction='column' $gap={6} width='100%'>
      <ClaimCollectionCreation />
    </FlexBox>
  )
}

export default Claims
