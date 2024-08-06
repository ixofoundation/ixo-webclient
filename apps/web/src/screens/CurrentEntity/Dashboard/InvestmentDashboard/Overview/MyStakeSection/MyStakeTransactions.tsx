import Image from 'next/image'
import React, { useMemo } from 'react'
import { Table } from 'components/Table'
import { Coin } from '@cosmjs/proto-signing'
import { useIxoConfigs } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { Typography } from 'components/Typography'
import { useGetBondTransactions } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { renderTableHeader } from 'components/Table/Table'
import { IconEye } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

interface Props {
  bondDid: string
}

const MyStakeTransactions: React.FC<Props> = ({ bondDid }) => {
  const theme = useMantineTheme()
  const { convertToDenom } = useIxoConfigs()
  const { did: accountDid } = useAccount()
  const { data: bondTransactions } = useGetBondTransactions(bondDid, accountDid)

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
        Header: renderTableHeader('Buy/Sell'),
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: any = undefined

          switch (type) {
            case 'buy':
              color = 'green'
              break
            case 'sell':
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
        Header: renderTableHeader('Quantity'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = (cell.value as Coin)?.amount || 0
          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{amount}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Price'),
        accessor: 'price',
        renderCell: (cell: any) => {
          const maxPrice = cell.row.original?.maxPrices && (cell.row.original?.maxPrices[0] as Coin)
          const price = convertToDenom(maxPrice)?.amount || '0'
          const quantity = (cell.row.original?.amount as Coin)?.amount
          const pricePerToken = quantity ? new BigNumber(price).dividedBy(quantity).toString() : '0'
          const formattedPricePerToken = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(pricePerToken))

          return (
            <Flex direction='column' p={4}>
              <Typography size='lg'>{formattedPricePerToken}</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Value', 'flex-end'),
        accessor: 'maxPrices',
        renderCell: (cell: any) => {
          const maxPrice = cell.value[0]
          const price = convertToDenom(maxPrice)
          const formattedPriceAmount = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(price?.amount || '0'))

          return (
            <Flex justify='flex-end' align='stretch' w='250px' h='100%'>
              <Flex h='100%' justify='center' align='center' p={4} bg={theme.colors.blue[9]} style={{ flex: 1 }}>
                <Typography weight='bold'>
                  {formattedPriceAmount} {price?.denom.toUpperCase()}
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
        data={bondTransactions}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {bondTransactions.length === 0 && (
        <Flex w='100%' h='80px' justify='center' align='center' style={{ borderRadius: 8, background: '#053549' }}>
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Transactions
          </Typography>
        </Flex>
      )}
    </TableWrapper>
  )
}

export default MyStakeTransactions
