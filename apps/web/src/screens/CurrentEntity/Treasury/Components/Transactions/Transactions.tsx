import Image from 'next/image'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import moment from 'moment'
import { renderTableHeader } from 'components/Table/Table'
import { IconUserPlusSolid } from 'components/IconPaths'
import { IconSentTransaction } from 'components/IconPaths'
import { IconIncomingTransaction } from 'components/IconPaths'
import { IconUserMinusSolid } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

interface Props {
  address: string
}

const Transactions: React.FC<Props> = ({ address }) => {
  const theme = useMantineTheme()
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
            <Image src={IconSentTransaction} alt='SentTransaction' width={5} height={5} color={theme.colors.blue[5]} />
            <Flex direction='column'>
              <Typography size='lg'>5,200.234 IXO</Typography>
              <Typography size='md'>Sent to ixo13452...ghbvd (by ixo12345...12345)</Typography>
            </Flex>
          </>
        )
        const renderGrantTx = () => (
          <>
            <Flex color={theme.colors.green[5]}>
              <Image src={IconUserPlusSolid} alt='UserPlusSolid' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
            <Flex direction='column'>
              <Typography size='lg'>Authorisation granted</Typography>
              <Typography size='md'>ixo12345...12345</Typography>
            </Flex>
          </>
        )
        const renderRevokeTx = () => (
          <>
            <Image src={IconUserMinusSolid} alt='UserMinusSolid' width={5} height={5} color={theme.colors.blue[5]} />
            <Flex direction='column'>
              <Typography size='lg'>Authorisation revoked</Typography>
              <Typography size='md'>ixo12345...12345</Typography>
            </Flex>
          </>
        )
        const renderReceiveTx = () => (
          <>
            <Image
              src={IconIncomingTransaction}
              alt='IncomingTransaction'
              width={5}
              height={5}
              color={theme.colors.blue[5]}
            />
            <Flex direction='column'>
              <Typography size='lg'>1,200.234 CARBON</Typography>
              <Typography size='md'>Received from ixo13452...ghbcd</Typography>
            </Flex>
          </>
        )

        return (
          <Flex align='center' gap={2} p={4}>
            {type === 'send' && renderSendTx()}
            {type === 'grant' && renderGrantTx()}
            {type === 'revoke' && renderRevokeTx()}
            {type === 'receive' && renderReceiveTx()}
          </Flex>
        )
      },
    },
    {
      Header: renderTableHeader('Date', 'flex-end'),
      accessor: 'timestamp',
      renderCell: (cell: any) => {
        const timestamp = moment(cell.value).utc()

        return (
          <Flex direction='column' align='end' p={4}>
            <Typography size='lg'>{timestamp.format('DD MMM YY')}</Typography>
            <Typography size='md' color='dark-blue'>
              {timestamp.format('hh:mm [UTC]')}
            </Typography>
          </Flex>
        )
      },
    },
  ]

  const handleRowClick = (state: any) => () => {
    console.log('handleRowClick', { state })
  }

  return (
    <Flex w='100%' direction='column' gap={3}>
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
          <Flex w='100%' h='80px' align='center' justify='center' bg='#053549' style={{ borderRadius: '8px' }}>
            <Typography variant='primary' size='lg' color='dark-blue'>
              No transactions found
            </Typography>
          </Flex>
        )}
      </TableWrapper>
    </Flex>
  )
}

export default Transactions
