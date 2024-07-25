import { ActionIcon, Flex, Text } from '@mantine/core'
import { LiaArrowCircleLeftSolid } from 'react-icons/lia'
import ClaimsList from './ClaimsList'
import { MembersList } from './MemberList'

const SelectedTabItem = () => {
  return (
    <Flex direction='column' w='100%' gap='lg' mt='lg'>
      <Flex>
        <ActionIcon variant='transparent'>
          <LiaArrowCircleLeftSolid />
        </ActionIcon>
        <Text>Claim Collection Title</Text>
      </Flex>
      <Flex w='100%' gap='lg'>
        <MembersList members={[]} />
        <ClaimsList
          claims={{
            approved: 0,
            disputed: 0,
            pending: 0,
            rejected: 0,
            total: 0,
          }}
        />
      </Flex>
    </Flex>
  )
}

export default SelectedTabItem
