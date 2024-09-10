import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button } from 'screens/CreateEntity/Components'
import React from 'react'

interface Props {
  onSubmit: () => void
}
const ClaimCollectionCreationStartStep: React.FC<Props> = ({ onSubmit }) => {
  return (
    <FlexBox width='100%' $gap={10} $justifyContent='space-between' $alignItems='center'>
      <Typography variant='secondary' size='2xl'>
        Create Claim Collection
      </Typography>

      <Button variant='secondary' onClick={onSubmit}>
        Create
      </Button>
    </FlexBox>
  )
}

export default ClaimCollectionCreationStartStep
