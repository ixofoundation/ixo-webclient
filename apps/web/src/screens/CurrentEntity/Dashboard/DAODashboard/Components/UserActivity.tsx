import Image from 'next/image'
import React, { useState } from 'react'
import { Card, TabButton } from '../../../Components'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import { truncateString } from 'utils/formatters'
import { IconClaim, IconPaper, IconClock, IconEye, IconSwap, IconIxo, IconProfile } from 'components/IconPaths'
import { Box, Button, Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

const renderTableHeader = (name: string) => (
  <Box p={5}>
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </Box>
)

const UserActivity: React.FC = (): JSX.Element => {
  const theme = useMantineTheme()
  const [tab, setTab] = useState('Transactions')

  const columns = [
    {
      Header: renderTableHeader('Date Status'),
      accessor: 'age',
      sortable: true,
      renderCell: (cell: any) => {
        const status = cell.row.original?.status
        return (
          <Flex p={5} pos={'relative'}>
            <Box
              pos='absolute'
              top={'50%'}
              left={'0px'}
              style={{ transform: 'translate(-50%, -50%)', borderRadius: '100px' }}
              w='12px'
              h='40px'
              bg={theme[status] ?? theme.colors.red[5]}
            />
            <Typography color='white'>
              {cell.value}{' '}
              <Typography color='light-blue' size='md'>
                ago
              </Typography>
            </Typography>
          </Flex>
        )
      },
    },
    {
      Header: renderTableHeader('Type'),
      accessor: 'type',
      renderCell: (cell: any) => (
        <Flex p={5}>
          <Typography>{cell.value}</Typography>
        </Flex>
      ),
    },
    {
      Header: renderTableHeader('Purpose'),
      accessor: 'purpose',
      renderCell: (cell: any) => (
        <Flex p={5}>
          <Typography>{cell.value}</Typography>
        </Flex>
      ),
    },
    {
      Header: renderTableHeader('Description'),
      accessor: 'description',
      renderCell: (cell: any) => (
        <Flex p={5}>
          <Typography>{truncateString(cell.value, 50)}</Typography>
        </Flex>
      ),
    },
    {
      Header: renderTableHeader('Value'),
      accessor: 'value',
      renderCell: (cell: any) => (
        <Flex h='100%'>
          <Flex w='100%' h='100%' p={5} align='center' bg={theme.colors.blue[5]} gap={2.5}>
            <Image src={IconIxo} alt='IXO' width={5} height={5} color={theme.colors.blue[5]} />
            <Typography weight='bold'>{Intl.NumberFormat().format(cell.value)}</Typography>
          </Flex>
          <Flex h='100%' align='center' bg={theme.colors.blue[5]}>
            <Image src={IconEye} alt='Eye' width={5} height={5} color={theme.colors.blue[5]} />
          </Flex>
        </Flex>
      ),
    },
  ]

  return (
    <Card icon={IconClock} label='Activity'>
      <Flex w='100%' gap={3}>
        <Button
          style={{ border: tab === 'Transactions' ? `1px solid ${theme.colors.blue[5]}` : 'none' }}
          leftSection={<Image src={IconSwap} alt='Swap' width={5} height={5} color={theme.colors.blue[5]} />}
          onClick={() => setTab('Transactions')}
        >
          Transactions
        </Button>
        <Button
          style={{ border: tab === 'Proposals' ? `1px solid ${theme.colors.blue[5]}` : 'none' }}
          leftSection={<Image src={IconPaper} alt='Paper' width={5} height={5} color={theme.colors.blue[5]} />}
          onClick={() => setTab('Proposals')}
        >
          Proposals
        </Button>
        <Button
          style={{ border: tab === 'Claims' ? `1px solid ${theme.colors.blue[5]}` : 'none' }}
          leftSection={<Image src={IconClaim} alt='Claim' width={5} height={5} color={theme.colors.blue[5]} />}
          onClick={() => setTab('Claims')}
        >
          Claims
        </Button>
        <Button
          style={{ border: tab === 'Members' ? `1px solid ${theme.colors.blue[5]}` : 'none' }}
          leftSection={<Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />}
          onClick={() => setTab('Members')}
        >
          Members
        </Button>
        <Button
          style={{ border: tab === 'Policies' ? `1px solid ${theme.colors.blue[5]}` : 'none' }}
          leftSection={<Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />}
          onClick={() => setTab('Policies')}
        >
          Policies
        </Button>
      </Flex>

      <TableWrapper>
        <Table
          columns={columns}
          data={[]}
          getRowProps={() => ({ style: { height: 70 } })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </Card>
  )
}

export default UserActivity
