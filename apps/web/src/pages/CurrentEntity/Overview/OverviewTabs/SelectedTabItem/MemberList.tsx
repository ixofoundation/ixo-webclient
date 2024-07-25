import { Avatar, Box, Stack, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaUser } from 'react-icons/lia'
import GrayCard from './GrayCard'

interface MemberProps {
  id: string
  avatarUrl?: string
  name: string
  role: string
}

function Member({ name, role, avatarUrl }: MemberProps) {
  return (
    <GrayCard>
      <Avatar src={avatarUrl} />
      <Box>
        <Text>{name}</Text>
        <Text>{role}</Text>
      </Box>
    </GrayCard>
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
        <GrayCard>
          <Avatar />
          <Box>
            <Text>Apply for a role</Text>
          </Box>
        </GrayCard>
      </Stack>
    </ActionCard>
  )
}

export { Member, MembersList }
export type { MemberProps, MembersListProps }
