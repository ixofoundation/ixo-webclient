import { Card, Image, Text, Badge, Group, Flex, Divider } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import { truncate } from 'lodash'
import { getEntityIcon } from 'utils/getEntityIcon'
import { ReactComponent as IconIxoToken } from 'assets/tokens/ixo.svg'
import { thousandSeparator } from 'utils/formatters'
import EarthIcon from 'assets/icons/EarthIcon'

type RequestCardProps = {
  entityName: string
  requestName: string
  requestDescription: string
  requestImage: string
}
const RequestCard = ({ entityName, requestName, requestImage, requestDescription }: RequestCardProps) => {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder bg={'#103449'} style={{ borderColor: '#103449' }}>
      <Card.Section>
        <Image
          src={requestImage}
          height={160}
          alt={requestName}
        />
      </Card.Section>

      <Flex justify='space-between' mt='md' mb='xs' align='center'>
        <Text fz={'lg'} fw={500} c={'white'} h="50px">
          {requestName}
        </Text>
        <IconDotsVertical color={'white'} />
      </Flex>

      <Group justify='space-between' mb='xs'>
        <Flex align='center'>
          {getEntityIcon('dao', { fill: 'black', stroke: 'black', color: '#407390' })}
          <Text ml={4} c='#407390' fz='sm'>
            {entityName}
          </Text>
        </Flex>
        <Flex align='center'>
          <EarthIcon color="#407390"/>
          <Text ml={4} c='#407390' fz='sm'>
            Soil Carbon
          </Text>
        </Flex>
      </Group>

      <Divider color='#213E59' />

      <Text size='sm' my={'md'} c='white' h="50px">
        {truncate(
          requestDescription,
          { length: 90 },
        )}
      </Text>

      <Divider color='#213E59' />

      <Flex justify='space-between' mt='sm'>
        <Badge fw={400} size='lg' leftSection={<IconIxoToken width={20} height={20} />} bg='#213E59'>
          {thousandSeparator(10000, ',')} IXO
        </Badge>
        <Badge fw={400} size='lg' bg='#213E59'>
          {50} days to go
        </Badge>
      </Flex>
    </Card>
  )
}

export default RequestCard
