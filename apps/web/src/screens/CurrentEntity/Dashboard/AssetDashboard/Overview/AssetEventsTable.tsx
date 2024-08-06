import Image from 'next/image'
import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { ColorCode } from 'components/ActivityCard/ActivityCard.styles'
import Table, { renderTableHeader } from 'components/Table/Table'
import { blockExplorerTransactionEndpoint } from 'constants/blockExplorers'
import { Message } from 'generated/graphql'
import { useGetIid } from 'graphql/iid'
import React, { useMemo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { timeAgo } from 'utils/time'
import { successToast } from 'utils/toast'
import { IconEye } from 'components/IconPaths'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  tableWrapper: {
    color: 'white',
    width: '100%',

    '& table': {
      width: '100%',
      borderSpacing: '0 4px',
      borderCollapse: 'separate',

      '& th, & td': {
        height: 'inherit',
      },
    },
  },
}))

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles()
  return <Box className={classes.tableWrapper}>{children}</Box>
}

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
  const theme = useMantineTheme()
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
              onClick={() => window.open(`${blockExplorerTransactionEndpoint}${transactionHash}`, '_blank')!.focus()}
            >
              <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
          )
        },
      },
    ],
    [],
  )

  return (
    <TableWrapper>
      <Table columns={columns as any} data={data} />
    </TableWrapper>
  )
}
