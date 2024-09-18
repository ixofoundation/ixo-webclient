import { Flex, Text } from "@mantine/core"
import { useCreateEntityStepState } from "hooks/createEntityStepState"

export const InvestmentCreationSuccess = () => {
    const { navigateToStepUsingPath } = useCreateEntityStepState()
    return (
      <Flex direction={'column'} gap={16}>
        <Text variant='secondary'>This is the last step before creating this Investment on the ixo Blockchain.</Text>
        <Text variant='secondary'>
          <Text
            component='span'
            c='ixo-blue.6'
            style={{ cursor: 'pointer' }}
            onClick={() => navigateToStepUsingPath('/entity/create/investment/profile')}
          >
            Review the Investment details
          </Text>{' '}
          you have configured.
        </Text>
        <Text variant='secondary'>
          <Text
            component='span'
            c='ixo-blue.6'
            style={{ cursor: 'pointer' }}
            onClick={() => navigateToStepUsingPath('/entity/create/investment/instrument')}
          >
            View the Investment Instrument/s
          </Text>{' '}
          you have programmed.
        </Text>
        <Text variant='secondary' display='inline'>
          When you are ready to commit, sign with your DID Account keys, or connect a different account as the DAO
          Creator.
        </Text>
      </Flex>
    )
  }