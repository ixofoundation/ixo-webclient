import { ActionIcon, Flex, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaArrowCircleLeftSolid } from 'react-icons/lia'
import ClaimRequirementsList from './ClaimRequirementsList'
import ClaimsList from './ClaimsList'
import { MembersList } from './MemberList'
import RewardsList from './RewardsList'

const SelectedTabItem = () => {
  const description = 'This is a description of the collection'
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
      <Flex w='100%' gap='lg'>
        {/* Description */}
        <ActionCard title='Description' icon={<DescriptionIcon />}>
          <Text>{description}</Text>
        </ActionCard>
        {/* Requirements List */}
        <ClaimRequirementsList
          requirements={[
            {
              title: 'Requirement 1',
              description: 'This is a description of the requirement',
              icon: 'https://via.placeholder.com/150',
            },
          ]}
        />
        {/* Reward List */}
        <RewardsList
          rewards={[
            {
              amount: {
                currency: 'IXO',
                value: '1000',
              },
              claimStatus: 'approved',
              icon: 'https://via.placeholder.com/150',
            },
          ]}
        />
      </Flex>
    </Flex>
  )
}

const DescriptionIcon = () => (
  <svg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M0 0.5V1.5H12V0.5H0ZM0 4.5V5.5H12V4.5H0ZM0 8.5V9.5H12V8.5H0Z' fill='#00D2FF' />
  </svg>
)

export default SelectedTabItem
