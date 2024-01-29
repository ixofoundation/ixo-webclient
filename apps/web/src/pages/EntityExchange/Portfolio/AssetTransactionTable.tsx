import { Coin } from '@cosmjs/proto-signing'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { EyeIcon } from 'components/Icons'
import Table, { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import { TTypographyColor } from 'components/Typography/Typography'
import { useMessagesQuery } from 'generated/graphql'
import { useIxoConfigs } from 'hooks/configs'
import moment from 'moment'
import { useMemo } from 'react'
import CurrencyFormat from 'react-currency-format'
import styled, { useTheme } from 'styled-components'

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

interface AssetTransactionTableProps {
  address: string
  asset: Coin
}
const AssetTransactionTable: React.FC<AssetTransactionTableProps> = ({ address, asset }) => {
  const theme: any = useTheme()
  const { convertToDenom } = useIxoConfigs()

  const { data: messagesData } = useMessagesQuery({
    variables: {
      first: 10,
      filter: {
        or: [
          {
            typeUrl: { equalTo: '/cosmos.bank.v1beta1.MsgSend' },
            from: { equalTo: address },
            denoms: { contains: [asset.denom] },
          },
          {
            typeUrl: { equalTo: '/cosmos.bank.v1beta1.MsgSend' },
            to: { equalTo: address },
            denoms: { contains: [asset.denom] },
          },
        ],
      },
    },
  })

  const transactionData = useMemo(() => {
    return (messagesData?.messages?.nodes ?? [])
      .map((data) => ({
        timestamp: data.transactionByTransactionHash?.time,
        type: data.from === address ? 'send' : 'receive',
        amount: (data.value.amount as Coin[]).find(({ denom }) => denom === asset.denom),
        fee: data.transactionByTransactionHash?.fee,
        height: data.transactionByTransactionHash?.height,
        hash: data.transactionHash,
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [messagesData, address, asset.denom])

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
          let color: TTypographyColor | undefined = undefined

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
        Header: renderTableHeader('Fee'),
        accessor: 'fee',
        renderCell: (cell: any) => {
          const fee = convertToDenom(cell.value.amount[0])
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>
                <CurrencyFormat
                  displayType='text'
                  value={fee?.amount || '0'}
                  thousandSeparator
                  decimalScale={6}
                  suffix={' ' + fee?.denom.toUpperCase()}
                />
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Height'),
        accessor: 'height',
        renderCell: (cell: any) => {
          const height = cell.value
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='lg'>
                <CurrencyFormat displayType='text' value={height} thousandSeparator />
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Value'),
        accessor: 'amount',
        renderCell: (cell: any) => {
          const amount = convertToDenom(cell.value)
          const hash = cell.row.original?.hash

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
                  <CurrencyFormat
                    displayType='text'
                    value={amount?.amount}
                    thousandSeparator
                    decimalScale={2}
                    suffix={' ' + amount?.denom.toUpperCase()}
                  />
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
                onClick={() => window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${hash}`, '_blank')}
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
export default AssetTransactionTable
