import { Box, Flex, rem } from '@mantine/core'
import KeyValueTable, { friendlyLinkedResourceNames, getLinkedResourceIcons } from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { upperFirst } from 'lodash'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useMantineTheme } from '@mantine/core'

export const ResourceTable = () => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { linkedResource } = useAppSelector(getEntityById(entityId))
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const linkedResourceColumns: Column[] = [
    {
      title: '',
      render: (row: any) => getLinkedResourceIcons(row.mediaType, { color: primaryColor }),
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Type',
      render: (row: any) => friendlyLinkedResourceNames(row.mediaType),
    },
    {
      title: 'Name',
      render: (row: any) => upperFirst(row?.description),
    },
  ]

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <KeyValueTable
          valueType={'resource'}
          columns={linkedResourceColumns}
          data={linkedResource}
          themeColor={primaryColor}
        />
      </Box>
    </Flex>
  )
}
