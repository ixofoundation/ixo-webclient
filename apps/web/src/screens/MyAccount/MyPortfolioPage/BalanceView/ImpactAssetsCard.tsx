import { Flex } from '@mantine/core'
import { Table } from 'components/Table'
import { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import { useGetAssetDevicesByOwner } from 'graphql/entities'
import { useAccount } from 'hooks/account'
import { Avatar, Card } from 'screens/CurrentEntity/Components'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'

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
        outline-color: ${(props) => props.theme.colors.blue[5]};
      }
    }
  }
`

const columns = [
  {
    Header: renderTableHeader('Name'),
    accessor: 'symbol',
    renderCell: (cell: any) => {
      return (
        <Flex align='center' gap={8} p={16}>
          <Avatar size={38} url={undefined} />
          <Flex direction='column'>
            <Typography size='lg' transform='uppercase'>
              SUPA
            </Typography>
            <Typography size='md'>SupaMoto Malawi Collection</Typography>
          </Flex>
        </Flex>
      )
    },
  },
  {
    Header: renderTableHeader('Value', 'flex-end'),
    accessor: 'alsoKnownAs',
    renderCell: (cell: any) => {
      const alsoKnownAs = cell.value.replace('{id}#', '')

      return (
        <Flex direction='column' align='end' p={16}>
          <Typography size='lg'>{alsoKnownAs}</Typography>
          <Typography size='md' color='dark-blue'>
            <CurrencyFormat prefix='$' displayType={'text'} value={''} thousandSeparator decimalScale={2} />
          </Typography>
        </Flex>
      )
    },
  },
]

const ImpactAssetsCard: React.FC = () => {
  const { address } = useAccount()
  const assetDevices = useGetAssetDevicesByOwner(address)

  const handleRowClick = (state: any) => () => {
    console.log('handleRowClick', { state })
  }
  return (
    <Card label='Impact Assets'>
      <TableWrapper>
        <Table
          columns={columns}
          data={assetDevices}
          getRowProps={(state) => ({
            style: { height: 70, cursor: 'pointer' },
            onClick: handleRowClick(state),
          })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
        {assetDevices.length === 0 && (
          <Flex w='100%' h='80px' align='center' justify='center' bg='#053549' style={{ borderRadius: 8 }}>
            <Typography variant='primary' size='lg' color='dark-blue'>
              This account holds no Assets
            </Typography>
          </Flex>
        )}
      </TableWrapper>
    </Card>
  )
}

export default ImpactAssetsCard
