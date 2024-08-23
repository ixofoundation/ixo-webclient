import { Avatar, Box, Flex, Text, rem } from '@mantine/core'
import KeyValueTable from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { upperFirst } from 'lodash'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import countries from 'constants/maps/countryLatLng.json'

export const EntitiesTable = ({ entities }: { entities: any[] }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue

  const entityColumns: Column[] = [
    {
      title: 'Domain',
      render: (row: any) => (
        <Flex align='center'>
          <Avatar size='md' src={row?.settings?.Profile?.data?.logo} />
          <Text ml={10}>{row?.settings?.Profile?.data?.name}</Text>
        </Flex>
      ),
      style: { style: { width: '20%' } },
    },
    {
      title: 'Type',
      render: (row: any) => upperFirst(row?.type),
      style: { style: { width: '20%' } },
    },
    {
      title: 'Metrics',
      render: (row: any) => 'N/A',
      style: { style: { width: '20%' } },
    },
    {
      title: 'Location',
      render: (row: any) => {
        return row?.settings?.Profile?.data?.location === 'AA'
          ? 'Global'
          : (countries.find((country) => country.alpha2 === row?.settings?.Profile?.data?.location)?.country ?? '')
      },
      style: { style: { width: '20%' } },
    },
  ]

  if (!entities?.length) {
    return null
  }

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='100%'>
        <KeyValueTable valueType={'entity'} columns={entityColumns} data={entities} themeColor={primaryColor} />
      </Box>
    </Flex>
  )
}
