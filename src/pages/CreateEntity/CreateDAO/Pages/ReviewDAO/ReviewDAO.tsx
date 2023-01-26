import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { TDAOMetadataModel } from 'types/protocol'
import DAOCard from './DAOCard'

const ReviewDAO: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const metadata: TDAOMetadataModel = createEntityState.metadata as TDAOMetadataModel
  const { gotoStep } = createEntityState

  const handleSignToCreate = async (): Promise<void> => {
    //
  }

  return (
    <FlexBox width={`${theme.breakpoints.md}px`} gap={10} alignItems='stretch'>
      <DAOCard image={metadata.image ?? ''} name={metadata.name ?? ''} numberOfMembers={12} />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this DAO on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Review the DAO details
            </Typography>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              View the DAO Groups
            </Typography>{' '}
            you have added.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Confirm the Headline Metric
            </Typography>{' '}
            that will be displayed on the DAO card.
          </Typography>
          <Typography variant='secondary'>
            When you are ready to commit, sign with your DID Account keys, or{' '}
            <Typography variant='secondary' color='blue'>
              connect a different account
            </Typography>{' '}
            as the DAO Creator.
          </Typography>
        </FlexBox>
        <FlexBox width='100%' gap={4}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
            Back
          </Button>
          <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }}>
            Sign To Create
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewDAO
