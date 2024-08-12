import { Flex, Box, Text, Progress } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { LiaPlusCircleSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { displayFiatAmount } from 'utils/currency'

const ItemCard = ({ title, amount, numberOfTasks }: { title: string; amount: number; numberOfTasks: string }) => {
  return (
    <Box w='100%' px='md' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
      <Flex justify={'center'} align={'flex-start'} direction={'column'}>
        <Text c='dimmed'>{title}</Text>
        <Text>{displayFiatAmount(Number(amount), '$')}</Text>
        <Text c='dimmed'>{numberOfTasks} Tasks</Text>
      </Flex>
    </Box>
  )
}

const FundingCard = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))
  const { totals } = useClaimTableData({ entityId: entity.id })

  const progressValue = (totals.available.count / totals.total.count) * 100

  return (
    <ActionCard title='Funding' icon={<LiaPlusCircleSolid />} editable={false}>
      <Progress value={progressValue} mt={4} radius={'lg'} size={'xl'} />
      <Flex w='100%' gap={10} align='center' style={{ borderRadius: '10px' }} mt={8}>
        <ItemCard
          title='Available'
          amount={totals.available.reward}
          numberOfTasks={totals.available.count.toString()}
        />
        <ItemCard title='Total' amount={totals.total.reward} numberOfTasks={totals.total.count.toString()} />
      </Flex>
    </ActionCard>
  )
}

export default FundingCard
