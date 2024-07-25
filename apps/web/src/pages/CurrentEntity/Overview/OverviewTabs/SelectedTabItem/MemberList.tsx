import { Avatar, Box, Flex, Stack, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaUser } from 'react-icons/lia'

interface MemberProps {
  id: string
  avatarUrl?: string
  name: string
  role: string
}

function Member({ name, role, avatarUrl }: MemberProps) {
  return (
    <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} gap={"md"}>
      <Avatar src={avatarUrl} />
      <Box>
        <Text>{name}</Text>
        <Text>{role}</Text>
      </Box>
    </Flex>
  )
}

interface MembersListProps {
  members: MemberProps[]
}
function MembersList({ members }: MembersListProps) {
  return (
    <ActionCard title='Role' icon={<LiaUser />}>
      <Stack w='100%' gap='lg'>
        {members.map((member) => (
          <Member key={member.id} {...member} />
        ))}
        <Flex w='100%' align='center' gap={"md"} bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} mt='md'>
          <Avatar />
          <Box>
            <Text>Apply for a role</Text>
          </Box>
        </Flex>
      </Stack>
    </ActionCard>
  )
}

export { Member, MembersList }
export type { MemberProps, MembersListProps }
