import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Table } from 'components/Table'
import { Coin } from '@cosmjs/proto-signing'
import { useIxoConfigs } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

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
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        width: 250px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const renderTableHeader = (name: string, justifyContent = 'flex-start') => (
  <FlexBox
    p={4}
    justifyContent={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </FlexBox>
)

const PaymentPays: React.FC = () => {
  const theme: any = useTheme()
  const { convertToDenom } = useIxoConfigs()
  const paymentPays: any[] = []

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Created'),
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
        Header: renderTableHeader('Status'),
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
            <FlexBox direction='column' p={4}>
              <Typography size='base' transform='capitalize' weight='bold' {...(color ? { color } : [])}>
                {cell.value}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Type'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = (cell.value as Coin)?.amount || 0
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>{amount}</Typography>
            </FlexBox>
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
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>{formattedPricePerToken}</Typography>
            </FlexBox>
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
            <FlexBox justifyContent='flex-end' alignItems='stretch' width='250px' height='100%'>
              <FlexBox
                height='100%'
                justifyContent='center'
                alignItems='center'
                p={4}
                background={theme.ixoNavyBlue}
                style={{ flex: 1 }}
              >
                <Typography weight='bold'>
                  {formattedPriceAmount} {price?.denom.toUpperCase()}
                </Typography>
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
    [convertToDenom, theme],
  )

  const onRowClick = (state: any) => () => {
    console.log('onRowClick', { state })
  }

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
        data={paymentPays}
        getRowProps={(state) => ({
          style: { height: 70, cursor: 'pointer' },
          onClick: onRowClick(state),
        })}
        getCellProps={() => ({ style: { background: '#023044' } })}
      />
      {paymentPays.length === 0 && (
        <FlexBox
          width='100%'
          height='80px'
          alignItems='center'
          justifyContent='center'
          borderRadius='8px'
          background='#053549'
        >
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Transactions
          </Typography>
        </FlexBox>
      )}
    </TableWrapper>
  )
}

export default PaymentPays
