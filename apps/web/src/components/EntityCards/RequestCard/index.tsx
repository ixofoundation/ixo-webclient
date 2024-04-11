import { Card, Image, Text, Badge, Button, Group, Flex, Divider } from '@mantine/core'
import { IconDotsVertical, IconGlobe } from '@tabler/icons-react'
import { trim, truncate } from 'lodash'
import { getEntityIcon } from 'utils/getEntityIcon'
import { ReactComponent as IconIxoToken } from 'assets/tokens/ixo.svg'
import { thousandSeparator } from 'utils/formatters'
import EarthIcon from 'assets/icons/EarthIcon'

const RequestCard = () => {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder bg={'#103449'} style={{ borderColor: '#103449' }}>
      <Card.Section>
        <Image
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
          height={160}
          alt='Norway'
        />
      </Card.Section>

      <Flex justify='space-between' mt='md' mb='xs' align='center'>
        <Text fz={'lg'} fw={500} c={'white'}>
          This is a very long request title that spans across two rows
        </Text>
        <IconDotsVertical color={'white'} />
      </Flex>

      <Group justify='space-between' mb='xs'>
        <Flex align='center'>
          {getEntityIcon('dao', { fill: 'black', stroke: 'black', color: '#407390' })}
          <Text ml={4} c='#407390' fz='sm'>
            Dao Name
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

      <Text size='sm' my={'md'} c='white'>
        {truncate(
          'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
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
