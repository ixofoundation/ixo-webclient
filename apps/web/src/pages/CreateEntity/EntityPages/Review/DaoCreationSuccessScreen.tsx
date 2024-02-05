import { Button, Flex, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'

const DaoCreationSuccess = () => {
  return (
    <Flex direction={'column'} gap={16}>
      <Text variant='secondary'>This is the last step before creating this DAO on the ixo Blockchain.</Text>
      <Text variant='secondary'>
        <NavLink to={'/create/entity/dao/profile'}>Review the DAO details</NavLink> you have configured.
      </Text>
      <Text variant='secondary'>
        <NavLink to={'/create/entity/dao/group'}>View the DAO Groups</NavLink> you have added.
      </Text>
      <Text variant='secondary' display='inline'>
        When you are ready to commit, sign with your DID Account keys, or{' '}
        <Text variant='secondary' display='inline'>
          connect a different account
        </Text>{' '}
        as the DAO Creator.
      </Text>
    </Flex>
  )
}

const ClaimCreationSuccess = () => {
  return (
    <Flex direction='column' gap={16}>
      <Text variant='secondary'>
        This is the last step before creating this Verifiable Claim on the ixo Blockchain.
      </Text>
      <Text variant='secondary'>
        <NavLink to={`/collection`}>Review the Verifiable Claim details</NavLink> you have configured.
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
  const CreationSuccessMap = {
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
        <Button variant='outline' bg='white' style={{ width: '100%', borderColor: '#00D2FF' }}>
          Back
        </Button>
        <Button
          bg='#00D2FF'
          variant='primary'
          onClick={handleSignToCreate}
          style={{ width: '100%' }}
          loading={submitting}
        >
          Sign To Create
        </Button>
      </Flex>
    </Flex>
  )
}
