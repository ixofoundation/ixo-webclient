import Image from 'next/image'
import React, { useMemo } from 'react'
import { Table } from 'components/Table'
import { useIxoConfigs } from 'hooks/configs'
import moment from 'moment'
import { Typography } from 'components/Typography'
import { useGetBondWithdrawals } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { renderTableHeader } from 'components/Table/Table'
import { IconEye } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

interface Props {
  bondDid: string
}

const ReserveWithdrawals: React.FC<Props> = ({ bondDid }) => {
  const theme = useMantineTheme()
  const { convertToDenom } = useIxoConfigs()
  const { did: accountDid } = useAccount()
  const { data: withdrawals } = useGetBondWithdrawals(bondDid, accountDid)

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
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Type'),
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: any = undefined

          switch (type) {
            case 'reserve':
              color = 'green'
              break
            case 'share':
              color = 'red'
              break
            default:
              break
          }
          return (
            <Flex direction='column' p={4}>
              <Typography size='base' transform='capitalize' weight='bold' {...(color ? { color } : [])}>
                {cell.value}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Purpose'),
        accessor: 'purpose',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{cell.value}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Description'),
        accessor: 'description',
        renderCell: (cell: any) => {
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{cell.value}</Typography>
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
              <Flex h='100%' justify='center' align='center' p={4} bg={theme.colors.blue[5]} style={{ flex: 1 }}>
                <Typography weight='bold'>
                  {formattedPriceAmount} {amount?.denom?.toUpperCase()}
                </Typography>
              </Flex>
              <Flex w='60px' h='100%' justify='center' align='center' bg={theme.colors.blue[5]} color='white'>
                <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
              </Flex>
            </Flex>
          )
        },
      },
    ],
    [convertToDenom, theme],
  )

  const onRowClick = (state: any) => () => {
    console.log('onRowClick', { state })
  }

  return (
    <TableWrapper>
      <Table
        columns={columns}
        data={withdrawals}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {withdrawals.length === 0 && (
        <Flex w='100%' h='80px' align='center' justify='center' bg='#053549' style={{ borderRadius: 8 }}>
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Withdrawals
          </Typography>
        </Flex>
      )}
    </TableWrapper>
  )
}

export default ReserveWithdrawals
