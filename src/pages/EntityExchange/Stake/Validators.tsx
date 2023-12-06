import BigNumber from 'bignumber.js'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import moment from 'moment'
import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { EyeIcon } from 'components/Icons'

const TableWrapper = styled(FlexBox)`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
      overflow: hidden;
    }

    tbody > tr {
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
      }
      & > td:last-child {
        width: 250px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const Validators: React.FC = () => {
  const theme: any = useTheme()

  const transactionData = [
    {
      timestamp: 1701808148639,
      type: 'buy',
      amount: 100,
      price: 1000,
    },
    {
      timestamp: 1701808148639,
      type: 'send',
      amount: 50,
      price: 500,
    },
    {
      timestamp: 1701808148639,
      type: 'receive',
      amount: 250,
      price: 500,
    },
    {
      timestamp: 1701808148639,
      type: 'swap',
      amount: 100,
      price: 1000,
    },
  ]

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
            <FlexBox direction='column' gap={1} p={4}>
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Transaction'),
        accessor: 'type',
        renderCell: (cell: any) => {
          const type = cell.value
          let color: any = undefined

          switch (type) {
            case 'buy':
              color = 'blue'
              break
            case 'send':
              color = 'red'
              break
            case 'receive':
              color = 'green'
              break
            case 'swap':
              color = 'orange'
              break
            default:
              break
          }
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='base' transform='capitalize' weight='bold' {...(color ? { color } : [])}>
                {cell.value}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Quantity'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = cell.value || 0
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>{amount}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Price'),
        accessor: 'price',
        renderCell: (cell: any) => {
          const price = cell.value || 0
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>{price}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Value'),
        accessor: 'value',
        renderCell: (cell: any) => {
          const price = cell.row.original?.price
          const amount = cell.row.original?.amount
          const usdAmount = new BigNumber(price).times(amount).toString()

          return (
            <FlexBox justifyContent='flex-end' alignItems='stretch' width='250px' height='100%'>
              <FlexBox
                height='100%'
                justifyContent='center'
                alignItems='center'
                p={4}
                background={theme.ixoNavyBlue}
                style={{ flex: 1 }}
              >
                <Typography weight='bold'>${usdAmount}</Typography>
              </FlexBox>
              <SvgBox
                width='60px'
                height='100%'
                justifyContent='center'
                alignItems='center'
                background={theme.ixoMediumBlue}
                color='white'
                hover={{ color: theme.ixoNewBlue }}
              >
                <EyeIcon />
              </SvgBox>
            </FlexBox>
          )
        },
      },
    ],
    [theme],
  )
  return (
    <TableWrapper
      width='100%'
      direction='column'
      borderRadius='4px'
      border={`1px solid #0C3549`}
      background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
      p={4}
    >
      <Table
        columns={columns}
        data={transactionData}
        getRowProps={() => ({
          style: { height: 70, cursor: 'pointer' },
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
    </TableWrapper>
  )
}
export default Validators
