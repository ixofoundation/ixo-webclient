import { Box, Flex, Text, Button } from '@mantine/core'
import { AgentRoles } from 'types/models'
import { toRootEntityType } from 'utils/entities'

type ClaimApplyCardProps = {
    type: string
    openForm: (arg: AgentRoles) => () => void
}
const ClaimApplyCard = ({type, openForm}: ClaimApplyCardProps) => {
    return  <Box>
    <Text fw='bolder'>Contribute to this {toRootEntityType(type)}</Text>
    <Flex gap={10} mt={10} direction={'column'}>
      <Button radius={4} size='md' onClick={openForm(AgentRoles.serviceProviders)}>
        Apply as a Service Agent
      </Button>
      <Button radius={4} size='md' onClick={openForm(AgentRoles.evaluators)}>
        Offer Oracle Services
      </Button>
      <Button radius={4} size='md' disabled>
        Make a Financial Contribution
      </Button>
    </Flex>
  </Box>
}

export default ClaimApplyCard