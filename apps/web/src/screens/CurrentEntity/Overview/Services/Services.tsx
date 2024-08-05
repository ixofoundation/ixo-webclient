import { Box, Flex, rem } from '@mantine/core'
import KeyValueTable from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { upperFirst } from 'lodash'
import { LiaHddSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useMantineTheme } from '@mantine/core'

export const ServiceTable = () => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { service } = useAppSelector(getEntityById(entityId))
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const servicecolumns: Column[] = [
    {
      title: '',
      render: (row: any) => <LiaHddSolid size={24} color={primaryColor} />,
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Type',
      render: (row: any) => row.type,
    },
    {
      title: 'Name',
      render: (row: any) => upperFirst(row.description),
    },
  ]

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <KeyValueTable valueType={'service'} columns={servicecolumns} data={service} themeColor={primaryColor} />
      </Box>
    </Flex>
  )
}
