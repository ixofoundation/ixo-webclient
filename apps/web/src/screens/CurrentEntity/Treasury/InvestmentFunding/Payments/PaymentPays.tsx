import Image from 'next/image'
import React, { useMemo } from 'react'
import { Table } from 'components/Table'
import { Coin } from '@cosmjs/proto-signing'
import { useIxoConfigs } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { Typography } from 'components/Typography'
import { renderTableHeader } from 'components/Table/Table'
import { IconEye } from 'components/IconPaths'
import { Box, Flex, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    color: theme.white,
    width: '100%',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.blue[9]}`,
    background: 'linear-gradient(180deg, #012639 0%, #002D42 97.29%)',
    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.18)',
    padding: theme.spacing.md,

    '& table': {
      width: '100%',
      borderSpacing: '0 8px',
      borderCollapse: 'separate',

      '& th, & td': {
        height: 'inherit',
        overflow: 'hidden',
      },

      '& tbody > tr': {
        borderRadius: theme.radius.md,
        outlineStyle: 'solid',
        outlineWidth: 1,
        outlineColor: 'transparent',
        transition: 'all 0.2s',

        '& > td:first-child': {
          borderTopLeftRadius: theme.radius.md,
          borderBottomLeftRadius: theme.radius.md,
        },
        '& > td:last-child': {
          borderTopRightRadius: theme.radius.md,
          borderBottomRightRadius: theme.radius.md,
          width: 250,
        },

        '&:hover': {
          outlineColor: theme.colors.blue[5],
        },
      },
    },
  },
  noTransactions: {
    width: '100%',
    height: 80,
    borderRadius: theme.radius.md,
    background: theme.colors.blue[9],
  },
}))

const PaymentPays: React.FC = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { convertToDenom } = useIxoConfigs()
  const paymentPays: any[] = []

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Created'),
        accessor: 'timestamp',
        renderCell: (cell: any) => {
          const timestamp = cell.value
          const date = moment(timestamp).format('DD MMM YY')
          const time = moment(timestamp).format('hh:mm')
          return (
            <Flex direction='column' gap='xs' p='xs'>
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='blue.3'>
                {time}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Status'),
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: string | undefined = undefined

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
            <Box p='xs'>
              <Typography size='base' transform='capitalize' weight='bold' color={color}>
                {cell.value}
              </Typography>
            </Box>
          )
        },
      },
      {
        Header: renderTableHeader('Type'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = (cell.value as Coin)?.amount || 0
          return (
            <Box p='xs'>
              <Typography size='lg'>{amount}</Typography>
            </Box>
          )
        },
      },
      {
        Header: renderTableHeader('Pay to'),
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
            <Box p='xs'>
              <Typography size='lg'>{formattedPricePerToken}</Typography>
            </Box>
          )
        },
      },
      {
        Header: renderTableHeader('Paid (Remaining)', 'flex-end'),
        accessor: 'maxPrices',
        renderCell: (cell: any) => {
          const maxPrice = cell.value[0]
          const price = convertToDenom(maxPrice)
          const formattedPriceAmount = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(price?.amount || '0'))

          return (
            <Flex justify='flex-end' align='stretch' style={{ width: 250, height: '100%' }}>
              <Flex justify='center' align='center' p='xs' style={{ flex: 1, background: theme.colors.blue[9] }}>
                <Typography weight='bold'>
                  {formattedPriceAmount} {price?.denom.toUpperCase()}
                </Typography>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w={60}
                style={{
                  background: theme.colors.blue[7],
                  color: theme.white,
                  '&:hover': { color: theme.colors.blue[5] },
                }}
              >
                <Image src={IconEye} alt='Eye' width={20} height={20} />
              </Flex>
            </Flex>
          )
        },
      },
    ],
    [convertToDenom, theme.colors],
  )

  const onRowClick = (state: any) => () => {
    console.log('onRowClick', { state })
  }

  return (
    <Box className={classes.tableWrapper}>
      <Table
        columns={columns}
        data={paymentPays}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: theme.colors.blue[8] } })}
      />
      {paymentPays.length === 0 && (
        <Flex className={classes.noTransactions} align='center' justify='center'>
          <Typography variant='primary' size='lg' color='blue.3'>
            No Transactions
          </Typography>
        </Flex>
      )}
    </Box>
  )
}

export default PaymentPays
