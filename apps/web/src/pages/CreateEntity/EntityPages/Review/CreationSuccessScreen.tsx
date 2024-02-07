import { Flex, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Button } from 'pages/CreateEntity/Components'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'

const ProjectCreationSuccess = () => {
  const { navigateToStepUsingPath } = useCreateEntityStepState()

  return (
    <Flex direction={'column'} gap={16}>
      <Text variant='secondary'>This is the last step before creating this Project on the ixo Blockchain.</Text>
      <Text variant='secondary'>
        <Text
          component='span'
          c='ixo-blue.6'
          style={{ cursor: 'pointer' }}
          onClick={() => navigateToStepUsingPath('/entity/create/project/profile')}
        >
          Review the Project details
        </Text>{' '}
        you have configured.
      </Text>
      <Text variant='secondary' display='inline'>
        When you are ready to commit, sign with your DID Account keys, or connect a different account as the Project
        Creator.
      </Text>
    </Flex>
  )
}

const DaoCreationSuccess = () => {
  const { navigateToStepUsingPath } = useCreateEntityStepState()
  return (
    <Flex direction={'column'} gap={16}>
      <Text variant='secondary'>This is the last step before creating this DAO on the ixo Blockchain.</Text>
      <Text variant='secondary'>
        <Text
          component='span'
          c='ixo-blue.6'
          style={{ cursor: 'pointer' }}
          onClick={() => navigateToStepUsingPath('/entity/create/dao/profile')}
        >
          Review the DAO details
        </Text>{' '}
        you have configured.
      </Text>
      <Text variant='secondary'>
        <Text
          component='span'
          c='ixo-blue.6'
          style={{ cursor: 'pointer' }}
          onClick={() => navigateToStepUsingPath('/entity/create/dao/groups')}
        >
          View the DAO Groups
        </Text>{' '}
        you have added.
      </Text>
      <Text variant='secondary' display='inline'>
        When you are ready to commit, sign with your DID Account keys, or connect a different account as the DAO
        Creator.
      </Text>
    </Flex>
  )
}

const ClaimCreationSuccess = () => {
  const { navigateToStepUsingPath } = useCreateEntityStepState()

  return (
    <Flex direction='column' gap={16}>
      <Text variant='secondary'>
        This is the last step before creating this Verifiable Claim on the ixo Blockchain.
      </Text>
      <Text variant='secondary'>
        <Text
          component='span'
          c='ixo-blue.6'
          style={{ cursor: 'pointer' }}
          onClick={() => navigateToStepUsingPath('/entity/create/protocol/collection')}
        >
          Review the Verifiable Claim details
        </Text>{' '}
        you have configured.
      </Text>
      <Text variant='secondary' display='inline'>
        When you are ready to commit, sign with your DID Account keys, or connect a different account as the Verifiable
        Claim Creator.
      </Text>
    </Flex>
  )
}

type CreationSuccessScreenProps = {
  entityType: string
  submitting: boolean
  handleSignToCreate: () => void
}

export const CreationSuccessScreen = ({ entityType, submitting, handleSignToCreate }: CreationSuccessScreenProps) => {
  const navigate = useNavigate()
  const CreationSuccessMap = {
    project: <ProjectCreationSuccess />,
    dao: <DaoCreationSuccess />,
    'protocol/claim': <ClaimCreationSuccess />,
    protocol: <ClaimCreationSuccess />,
  }

  return (
    <Flex direction='column' justify={'space-between'} gap={4} h='100%'>
      <Flex direction='column' gap={4} style={{ width: '100%' }}>
        {CreationSuccessMap[entityType]}
      </Flex>
      <Flex gap={4} style={{ width: '100%' }}>
        {/* <Button
          variant='outline'
          bg='white'
          c={'black'}
          onClick={() => navigate(-1)}
          style={{ borderColor: mantineThemeColors['ixo-blue'][6] }}
        >
          Back
        </Button>
        <Button bg='ixo-blue.6' variant='primary' onClick={handleSignToCreate} loading={submitting}>
          Sign To Create
        </Button> */}
        <Button variant='secondary' onClick={() => navigate(-1)} style={{ width: '100%' }}>
          Back
        </Button>
        <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
          Sign To Create
        </Button>
      </Flex>
    </Flex>
  )
}
