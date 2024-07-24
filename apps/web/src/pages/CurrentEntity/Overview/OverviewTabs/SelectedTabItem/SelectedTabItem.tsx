import { Box, Flex, ActionIcon, Text, Avatar } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaArrowCircleLeftSolid, LiaUser, LiaCircleNotchSolid } from 'react-icons/lia'

const SelectedTabItem = () => {
  return (
    <Flex direction='column' w='100%' gap="lg" mt="lg">
      <Flex>
        <ActionIcon variant='transparent'>
          <LiaArrowCircleLeftSolid />
        </ActionIcon>
        <Text>Claim Collection Title</Text>
      </Flex>
      <Flex w='100%' gap="lg">
        <ActionCard title='Role' icon={<LiaUser />}>
          <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
            <Avatar />
            <Box>
              <Text>Jane Doe</Text>
              <Text>Developer</Text>
            </Box>
          </Flex>
          <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} mt="md">
            <Avatar />
            <Box>
              <Text>Apply for a role</Text>
            </Box>
          </Flex>
        </ActionCard>
        <ActionCard title='Claims' icon={<LiaCircleNotchSolid />}>
          <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
            <Avatar />
            <Box>
              <Text>Apply to submit claims</Text>
            </Box>
          </Flex>
        </ActionCard>
      </Flex>
    </Flex>
  )
}

export default SelectedTabItem
