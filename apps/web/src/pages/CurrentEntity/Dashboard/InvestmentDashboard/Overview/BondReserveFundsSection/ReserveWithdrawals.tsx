import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Table } from 'components/Table'
import { useIxoConfigs } from 'hooks/configs'
import moment from 'moment'
import { ReactComponent as EyeIcon } from 'assets/images/icon-eye.svg'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetBondWithdrawals } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { renderTableHeader } from 'components/Table/Table'

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

interface Props {
  bondDid: string
}

const ReserveWithdrawals: React.FC<Props> = ({ bondDid }) => {
  const theme: any = useTheme()
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
            <FlexBox $direction='column' $gap={1} p={4}>
              <Typography size='lg'>{date}</Typography>
              <Typography size='sm' color='light-blue'>
                {time}
              </Typography>
            </FlexBox>
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
            <FlexBox $direction='column' p={4}>
              <Typography size='base' transform='capitalize' weight='bold' {...(color ? { color } : [])}>
                {cell.value}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Purpose'),
        accessor: 'purpose',
        renderCell: (cell: any) => {
          return (
            <FlexBox $direction='column' p={4}>
              <Typography size='lg'>{cell.value}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Description'),
        accessor: 'description',
        renderCell: (cell: any) => {
          return (
            <FlexBox $direction='column' p={4}>
              <Typography size='lg'>{cell.value}</Typography>
            </FlexBox>
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
            <FlexBox $justifyContent='flex-end' $alignItems='stretch' width='250px' height='100%'>
              <FlexBox
                height='100%'
                $justifyContent='center'
                $alignItems='center'
                p={4}
                background={theme.ixoNavyBlue}
                style={{ flex: 1 }}
              >
                <Typography weight='bold'>
                  {formattedPriceAmount} {amount?.denom?.toUpperCase()}
                </Typography>
              </FlexBox>
              <SvgBox
                width='60px'
                height='100%'
                $justifyContent='center'
                $alignItems='center'
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
      $direction='column'
      $borderRadius='4px'
      border={`1px solid #0C3549`}
      background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      $boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
      p={4}
    >
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
        <FlexBox
          width='100%'
          height='80px'
          $alignItems='center'
          $justifyContent='center'
          $borderRadius='8px'
          background='#053549'
        >
          <Typography variant='primary' size='lg' color='dark-blue'>
            No Withdrawals
          </Typography>
        </FlexBox>
      )}
    </TableWrapper>
  )
}

export default ReserveWithdrawals
