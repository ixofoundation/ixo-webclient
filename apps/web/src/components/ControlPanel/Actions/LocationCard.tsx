import { Flex, Box, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaMapMarkerSolid } from 'react-icons/lia'
import { TEntityModel } from 'types/entities'
import { DateFormat, formatDate } from 'utils/date'

type LocationCardProps = {
  entity: TEntityModel
}

const LocationCard = ({ entity }: LocationCardProps) => {
  const startDate = formatDate({
    dateString: new Date(entity?.startDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  const endDate = formatDate({
    dateString: new Date(entity?.endDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  return (
    <ActionCard title='Location' icon={<LiaMapMarkerSolid />}>
      <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} gap='md'>
        <Box w='100%' px='md'>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <Text c="dimmed">start</Text>
            <Text>{startDate}</Text>
          </Flex>
        </Box>
        <Box w='100%' px='md'>
          <Flex justify={'center'} align={'center'} direction={'column'}>
            <Text c="dimmed">end</Text>
            <Text>{endDate}</Text>
          </Flex>
        </Box>
      </Flex>
    </ActionCard>
  )
}

export default LocationCard
