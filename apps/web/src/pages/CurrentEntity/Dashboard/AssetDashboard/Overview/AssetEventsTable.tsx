import { Flex, Text } from '@mantine/core'
import { ColorCode } from 'components/ActivityCard/ActivityCard.styles'
import { Box } from 'components/App/App.styles'
import { EyeIcon } from 'components/Icons'
import { Table } from 'components/MantineTable'
import { Typography } from 'components/Typography'
import { Message } from 'generated/graphql'
import React from 'react'
import { timeAgo } from 'utils/time'

const renderTableHeader = (name: string) => (
  <Box p={5}>
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </Box>
)

export type AssetEventsTableProps = {
  events?: Message[]
}
export const AssetEventsTable = ({ events }: AssetEventsTableProps) => {
  const data = React.useMemo(() => events, [events])
  const columns = React.useMemo(
    () => [
      {
        Header: renderTableHeader('Date Status'),
        id: 'date-status',
        sortable: true, // Make sure to add this property
        accessor: ({ transactionByTransactionHash }: Message) => (
          <Flex pos='relative' h='100%' align='center'>
            <ColorCode backgroundColor='green' height='60%' />
            <Text ml={24} color='white'>
              {transactionByTransactionHash?.time
                ? timeAgo.format(new Date(transactionByTransactionHash?.time))
                : 'N/A'}
            </Text>
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Action'),
        accessor: 'Action',
        renderCell: ({ typeUrl }: Message) => (
          <Flex w='100%' color='white'>
            {typeUrl}
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Sender'),
        accessor: 'Sender',
        renderCell: ({ from }: Message) => (
          <Flex w='100%' color='white'>
            <Text ml={24}>{from || 'N/A'}</Text>
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Receiver'),
        id: 'edit-service',
        accessor: 'Receiver',
        renderCell: ({ to }: Message) => (
          <Flex w='100%' color='white'>
            <Text ml={24}>{to || 'N/A'}</Text>
          </Flex>
        ),
      },
      {
        Header: renderTableHeader('Value'),
        id: 'value',
        accessor: ({ denoms, transactionHash }: Message) => {
          const displayCondition = Boolean(denoms?.length)
          return (
            <Flex w='100%' bg='#143F54' h='100%'>
              <Flex style={{ flexGrow: 1 }} justify='center' align='center'>
                {displayCondition && <Text>{JSON.stringify(denoms)}</Text>}
                {!displayCondition && <Text>N/A</Text>}
              </Flex>
              <Flex
                align='center'
                justify='center'
                bg='#107591'
                w='25%'
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  window
                    .open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${transactionHash}`, '_blank')!
                    .focus()
                }
              >
                <EyeIcon />
              </Flex>
            </Flex>
          )
        },
      },
    ],
    [],
  )

  return <Table columns={columns} data={data} />
}
