import Image from 'next/image'
import React, { useMemo } from 'react'
import { Box, Table, Flex, Text, Container } from '@mantine/core'
import { Coin } from '@cosmjs/proto-signing'
import { useIxoConfigs } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { useGetBondTransactions } from 'graphql/bonds'
import { IconEye } from 'components/IconPaths'
import { useMantineTheme } from '@mantine/core'

interface Props {
  bondDid: string
}

const BondTransactions: React.FC<Props> = ({ bondDid }) => {
  const theme = useMantineTheme()
  const { convertToDenom } = useIxoConfigs()
  const { data: bondTransactions } = useGetBondTransactions(bondDid)

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'timestamp',
        renderCell: (cell: any) => {
          const timestamp = cell.value
          const date = moment(timestamp).format('DD MMM ‘YY')
          const time = moment(timestamp).format('hh:mm')
          return (
            <Flex direction='column' gap={1} p={4}>
              <Text size='lg'>{date}</Text>
              <Text size='sm' color={theme.colors.blue[5]}>
                {time}
              </Text>
            </Flex>
          )
        },
      },
      {
        Header: 'Buy/Sell',
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: string | undefined = undefined

          switch (type) {
            case 'buy':
              color = theme.colors.green[6]
              break
            case 'sell':
              color = theme.colors.red[6]
              break
            default:
              break
          }
          return (
            <Flex direction='column' p={4}>
              <Text size='md' tt='capitalize' fw='bold' c={color}>
                {cell.value}
              </Text>
            </Flex>
          )
        },
      },
      {
        Header: 'Quantity',
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = (cell.value as Coin)?.amount || 0
          return (
            <Flex direction='column' p={4}>
              <Text size='lg'>{amount}</Text>
            </Flex>
          )
        },
      },
      {
        Header: 'Price',
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
              <Text size='lg'>{formattedPricePerToken}</Text>
            </Flex>
          )
        },
      },
      {
        Header: 'Value',
        accessor: 'maxPrices',
        renderCell: (cell: any) => {
          const maxPrice = cell.value[0]
          const price = convertToDenom(maxPrice)
          const formattedPriceAmount = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 6,
          }).format(Number(price?.amount || '0'))

          return (
            <Flex justify='flex-end' align='stretch' style={{ width: '250px', height: '100%' }}>
              <Flex justify='center' align='center' p={4} style={{ flex: 1, background: theme.colors.dark[7] }}>
                <Text w='bold'>
                  {formattedPriceAmount} {price?.denom.toUpperCase()}
                </Text>
              </Flex>
              <Box
                style={{
                  width: '60px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: theme.colors.dark[6],
                  color: 'white',
                  '&:hover': { color: theme.colors.blue[5] },
                }}
              >
                <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
              </Box>
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
    <Container
      fluid
      style={{
        width: '100%',
        borderRadius: '4px',
        border: `1px solid ${theme.colors.dark[5]}`,
        background: 'linearGradient(180, theme.colors.dark[7], theme.colors.dark[8])',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.18)',
        padding: theme.spacing.md,
      }}
    >
      <Table horizontalSpacing='md' verticalSpacing='sm' striped highlightOnHover style={{ width: '100%' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bondTransactions.map((transaction, index) => (
            <tr key={index} onClick={onRowClick(transaction)} style={{ cursor: 'pointer' }}>
              {columns.map((column, cellIndex) => (
                <td key={cellIndex}>
                  {column.renderCell({ value: transaction[column.accessor], row: { original: transaction } })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {bondTransactions.length === 0 && (
        <Flex
          style={{
            width: '100%',
            height: '80px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            background: theme.colors.dark[6],
          }}
        >
          <Text size='lg' c={theme.colors.gray[5]}>
            No Transactions
          </Text>
        </Flex>
      )}
    </Container>
  )
}

export default BondTransactions
