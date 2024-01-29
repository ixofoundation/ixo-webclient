import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as SentTransactionIcon } from 'assets/images/icon-sent-transaction.svg'
import { ReactComponent as UserPlusSolidIcon } from 'assets/images/icon-user-plus-solid.svg'
import { ReactComponent as UserMinusSolidIcon } from 'assets/images/icon-user-minus-solid.svg'
import { ReactComponent as IncomingTransactionIcon } from 'assets/images/icon-incoming-transaction.svg'
import moment from 'moment'
import { renderTableHeader } from 'components/Table/Table'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
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
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

interface Props {
  address: string
}

const Transactions: React.FC<Props> = ({ address }) => {
  const theme: any = useTheme()
  const [data] = useState<any[]>([
    // {
    //   type: 'send',
    //   payload: {},
    //   timestamp: new Date().toISOString(),
    // },
    // {
    //   type: 'grant',
    //   payload: {},
    //   timestamp: new Date().toISOString(),
    // },
    // {
    //   type: 'revoke',
    //   payload: {},
    //   timestamp: new Date().toISOString(),
    // },
    // {
    //   type: 'receive',
    //   payload: {},
    //   timestamp: new Date().toISOString(),
    // },
  ])

  const columns = [
    {
      Header: renderTableHeader('Type'),
      accessor: 'type',
      renderCell: (cell: any) => {
        const type = cell.value

        const renderSendTx = () => (
          <>
            <SentTransactionIcon />
            <FlexBox direction='column'>
              <Typography size='lg'>5,200.234 IXO</Typography>
              <Typography size='md'>Sent to ixo13452...ghbvd (by ixo12345...12345)</Typography>
            </FlexBox>
          </>
        )
        const renderGrantTx = () => (
          <>
            <SvgBox color={theme.ixoGreen}>
              <UserPlusSolidIcon />
            </SvgBox>
            <FlexBox direction='column'>
              <Typography size='lg'>Authorisation granted</Typography>
              <Typography size='md'>ixo12345...12345</Typography>
            </FlexBox>
          </>
        )
        const renderRevokeTx = () => (
          <>
            <UserMinusSolidIcon />
            <FlexBox direction='column'>
              <Typography size='lg'>Authorisation revoked</Typography>
              <Typography size='md'>ixo12345...12345</Typography>
            </FlexBox>
          </>
        )
        const renderReceiveTx = () => (
          <>
            <IncomingTransactionIcon />
            <FlexBox direction='column'>
              <Typography size='lg'>1,200.234 CARBON</Typography>
              <Typography size='md'>Received from ixo13452...ghbcd</Typography>
            </FlexBox>
          </>
        )

        return (
          <FlexBox alignItems='center' gap={2} p={4}>
            {type === 'send' && renderSendTx()}
            {type === 'grant' && renderGrantTx()}
            {type === 'revoke' && renderRevokeTx()}
            {type === 'receive' && renderReceiveTx()}
          </FlexBox>
        )
      },
    },
    {
      Header: renderTableHeader('Date', 'flex-end'),
      accessor: 'timestamp',
      renderCell: (cell: any) => {
        const timestamp = moment(cell.value).utc()

        return (
          <FlexBox direction='column' alignItems='end' p={4}>
            <Typography size='lg'>{timestamp.format('DD MMM YY')}</Typography>
            <Typography size='md' color='dark-blue'>
              {timestamp.format('hh:mm [UTC]')}
            </Typography>
          </FlexBox>
        )
      },
    },
  ]

  const handleRowClick = (state: any) => () => {
    console.log('handleRowClick', { state })
  }

  return (
    <FlexBox width='100%' direction='column' gap={3}>
      <TableWrapper>
        <Table
          columns={columns}
          data={data}
          getRowProps={(state) => ({
            style: { height: 70, cursor: 'pointer' },
            onClick: handleRowClick(state),
          })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
        {data.length === 0 && (
          <FlexBox
            width='100%'
            height='80px'
            alignItems='center'
            justifyContent='center'
            borderRadius='8px'
            background='#053549'
          >
            <Typography variant='primary' size='lg' color='dark-blue'>
              No transactions found
            </Typography>
          </FlexBox>
        )}
      </TableWrapper>
    </FlexBox>
  )
}

export default Transactions
