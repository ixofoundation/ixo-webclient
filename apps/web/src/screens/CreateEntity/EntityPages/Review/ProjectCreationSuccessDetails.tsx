import { Flex, Text } from "@mantine/core"
import { useCreateEntityStepState } from "hooks/createEntityStepState"

export const ProjectCreationSuccess = () => {
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