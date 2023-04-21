import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { TProjectMetadataModel } from 'types/protocol'
import ProjectCard from './ProjectCard'

const ReviewProject: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const metadata: TProjectMetadataModel = createEntityState.metadata as TProjectMetadataModel
  const { gotoStep } = createEntityState

  const handleSignToCreate = async (): Promise<void> => {
    //
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <ProjectCard
        image={metadata?.image ?? ''}
        icon={metadata?.icon ?? ''}
        name={metadata?.name ?? ''}
        endDate={metadata?.endDate ?? ''}
      />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this Project on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Review the Project details
            </Typography>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              View the Project Groups
            </Typography>{' '}
            you have added.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Confirm the Headline Metric
            </Typography>{' '}
            that will be displayed on the Project card.
          </Typography>
          <Typography variant='secondary'>
            When you are ready to commit, sign with your DID Account keys, or{' '}
            <Typography variant='secondary' color='black'>
              connect a different account
            </Typography>{' '}
            as the Project Creator.
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

export default ReviewProject
