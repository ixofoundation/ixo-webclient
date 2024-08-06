import Image from 'next/image'
import { Typography } from 'components/Typography'
import moment from 'moment'
import React, { useMemo } from 'react'
import { Table } from 'components/Table'
import { useGetBondOutcomePayments } from 'graphql/bonds'
import { useIxoConfigs } from 'hooks/configs'
import { truncateString } from 'utils/formatters'
import { renderTableHeader } from 'components/Table/Table'
import { IconEye } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

interface Props {
  bondDid: string
}

const OutcomePayments: React.FC<Props> = ({ bondDid }) => {
  const theme = useMantineTheme()
  const { convertToDenom } = useIxoConfigs()
  const { data: outcomePayments } = useGetBondOutcomePayments(bondDid)

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Date'),
        accessor: 'timestamp',
        renderCell: (cell: any) => {
          const timestamp = cell.value
          const date = moment(timestamp).format('DD MMM ‘YY')
          const time = moment(timestamp).format('hh:mm')
          return (
            <Flex direction='column' gap={1} p={4}>
              <Typography size='lg' $noWrap>
                {date}
              </Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Status'),
        accessor: 'status',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{'Open'}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Type'),
        accessor: 'type',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{'Success Fee'}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Payor'),
        accessor: 'senderAddress',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{truncateString(cell.value, 20)}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Conditions'),
        accessor: 'condition',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{'(Target A > 90%) AND (Target B > 50%)'}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Value', 'flex-end'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = convertToDenom(cell.value[0])
          const formattedPriceAmount = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(amount?.amount || '0'))

          return (
            <Flex justify='flex-end' align='stretch' w='250px' h='100%'>
              <Flex h='100%' justify='center' align='center' p={4} bg={theme.colors.blue[9]} style={{ flex: 1 }}>
                <Typography weight='bold'>
                  {formattedPriceAmount} {amount?.denom?.toUpperCase()}
                </Typography>
              </Flex>
              <Flex
                w='60px'
                h='100%'
                justify='center'
                align='center'
                bg={theme.colors.blue[8]}
                color='white'
                style={{ color: theme.colors.blue[5] }}
              >
                <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
              </Flex>
            </Flex>
          )
        },
      },
    ],
    [convertToDenom, theme],
  )

  return (
    <TableWrapper>
      <Table
        columns={columns}
        data={outcomePayments}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          // onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {outcomePayments.length === 0 && (
        <Flex
          w='100%'
          h='80px'
          align='center'
          justify='center'
          style={{ borderRadius: 8, background: '#053549' }}
          bg='#053549'
        >
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Outcome payment histories
          </Typography>
        </Flex>
      )}
    </TableWrapper>
  )
}

export default OutcomePayments
