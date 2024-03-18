import { Flex, Text } from '@mantine/core'
import { ColorCode } from 'components/ActivityCard/ActivityCard.styles'
import { EyeIcon } from 'components/Icons'
import Table, { renderTableHeader } from 'components/Table/Table'
import { Message } from 'generated/graphql'
import { useGetIid } from 'graphql/iid'
import React, { useMemo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { truncateString } from 'utils/formatters'
import { timeAgo } from 'utils/time'
import { successToast } from 'utils/toast'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 4px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }
  }
`

const DidToAddress = ({ did }: { did: string }) => {
  const { data: iid } = useGetIid(did)

  const address = useMemo(
    () => iid?.verificationMethod.find((v) => v.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
    [iid],
  )

  return (
    <CopyToClipboard text={address} onCopy={() => successToast(null, `Copied to clipboard`)}>
      <Text style={{ cursor: 'pointer' }}>{truncateString(address, 20, 'middle')}</Text>
    </CopyToClipboard>
  )
}

export type AssetEventsTableProps = {
  events?: Message[]
}
export const AssetEventsTable = ({ events = [] }: AssetEventsTableProps) => {
  const data = React.useMemo(() => events, [events])
  const columns = React.useMemo(
    () => [
      {
        id: 'date-status',
        Header: renderTableHeader('Date Status'),
        sortable: true, // Make sure to add this property
        accessor: ({ transactionByTransactionHash }: Message) => (
          <Flex pos='relative' align='center' p={16}>
            <ColorCode backgroundColor='green' height='60%' />
            <Text>
              {transactionByTransactionHash?.time
                ? timeAgo.format(new Date(transactionByTransactionHash?.time))
                : 'N/A'}
            </Text>
          </Flex>
        ),
      },
      {
        id: 'action',
        Header: renderTableHeader('Action'),
        accessor: ({ typeUrl }: Message) => (
          <Flex w='100%' align='center' p={16}>
            <Text>Transfer Entity</Text>
          </Flex>
        ),
      },
      {
        id: 'sender',
        Header: renderTableHeader('Sender'),
        accessor: ({ value }: Message) => (
          <Flex w='100%' color='white' p={16}>
            <DidToAddress did={value.ownerDid} />
          </Flex>
        ),
      },
      {
        id: 'receiver',
        Header: renderTableHeader('Receiver'),
        accessor: ({ value }: Message) => (
          <Flex w='100%' color='white' p={16}>
            <DidToAddress did={value.recipientDid} />
          </Flex>
        ),
      },
      {
        id: 'tx',
        Header: renderTableHeader('Transaction', 'center'),
        accessor: ({ transactionHash }: Message) => {
          return (
            <Flex
              align='center'
              justify='center'
              w='100%'
              bg='#107591'
              p={16}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                window
                  .open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${transactionHash}`, '_blank')!
                  .focus()
              }
            >
              <EyeIcon />
            </Flex>
          )
        },
      },
    ],
    [],
  )

  return (
    <TableWrapper>
      <Table columns={columns} data={data} />
    </TableWrapper>
  )
}
