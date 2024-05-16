import { Flex, Text } from '@mantine/core'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'

export const ClaimCreationSuccess = () => {
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
