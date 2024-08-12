import { Box, Flex, Text, Button } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaUserSolid } from 'react-icons/lia'
import { AgentRoles } from 'types/models'

const roleNames = {
  SA: 'Agent',
  EA: 'Evaluator',
}

type RequestApplyCardProps = {
  openForm: (arg: AgentRoles) => () => void
  userRole?: AgentRoles
}
const RequestApplyCard = ({ openForm, userRole }: RequestApplyCardProps) => {
  const roleMessage = userRole === 'SA' ? 'You can submit claims' : 'You can evaluate claims'
  return (
    <ActionCard title='Role' icon={<LiaUserSolid />} noPadding>
      <Box w='100%' p='md' pt={4}>
        <Flex w='100%' gap={'md'} align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
          <LiaUserSolid size={40} />
          <Box>
            <Text>{userRole ? roleNames[userRole] : 'Apply for a role'}</Text>
            <Text c='dimmed' size='sm'>
              {userRole ? roleMessage : 'Required to submit claims'}
            </Text>
          </Box>
        </Flex>
      </Box>
      {!userRole && (
        <Flex w='100%' bg='#F2FEFF' p='md' gap={'md'} direction='column'>
          <Button w='100%' radius={'md'} onClick={openForm(AgentRoles.serviceProviders)}>
            Apply as agent
          </Button>
          <Button w='100%' radius={'md'} onClick={openForm(AgentRoles.evaluators)}>
            Apply as evaluator
          </Button>
        </Flex>
      )}
    </ActionCard>
  )
}

export default RequestApplyCard
