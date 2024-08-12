import { Box, Flex, Text, rem } from '@mantine/core'
import KeyValueTable, { friendlyLinkedResourceNames, getLinkedResourceIcons } from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { upperFirst } from 'lodash'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'

const excludedResourceTypes = ['Settings', 'VerifiableCredential']

export const ResourceTable = ({ title }: { title?: string }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { linkedResource } = useAppSelector(getEntityById(entityId))
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const tableData = useMemo(() => {
    return linkedResource?.filter((resource) => !excludedResourceTypes.includes(resource.type))
  }, [linkedResource])

  const linkedResourceColumns: Column[] = [
    {
      title: '',
      render: (row: any) => getLinkedResourceIcons(row.mediaType, { color: primaryColor }),
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Resource',
      render: (row: any) => friendlyLinkedResourceNames(row.mediaType),
      style: { style: { width: '100%' } },
    },
    {
      title: 'File',
      render: (row: any) => upperFirst(row?.description),
      style: { style: { width: rem(50) } },
    },
    {
      title: 'Type',
      render: (row: any) => upperFirst(row?.type),
      style: { style: { width: rem(50) } },
    },
    {
      title: 'Visible',
      render: (row: any) => <Text>Yes</Text>,
      style: { style: { width: rem(50) } },
    },
  ]

  if (!tableData?.length) {
    return null
  }

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <Text fz={'lg'}>{title}</Text>
        <KeyValueTable
          valueType={'resource'}
          columns={linkedResourceColumns}
          data={tableData}
          themeColor={primaryColor}
        />
      </Box>
    </Flex>
  )
}
