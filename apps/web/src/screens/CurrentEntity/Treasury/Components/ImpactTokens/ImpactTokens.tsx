import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'
import { Avatar } from 'screens/CurrentEntity/Components'
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

const columns = [
  {
    Header: renderTableHeader('Token'),
    accessor: 'name',
    renderCell: (cell: any) => {
      const coinDenom = cell.row.original?.coinDenom
      const network = cell.row.original?.network
      const coinImageUrl = cell.row.original?.coinImageUrl

      return (
        <FlexBox $alignItems='center' $gap={2} p={4}>
          <Avatar size={38} url={coinImageUrl} />
          <FlexBox $direction='column'>
            <Typography size='lg' transform='uppercase'>
              {coinDenom}
            </Typography>
            <Typography size='md'>{network}</Typography>
          </FlexBox>
        </FlexBox>
      )
    },
  },
  {
    Header: renderTableHeader('Amount', 'flex-end'),
    accessor: 'balance',
    renderCell: (cell: any) => {
      const balance = cell.value
      return (
        <FlexBox $direction='column' $alignItems='end' p={4}>
          <Typography size='lg'>
            <CurrencyFormat
              displayType={'text'}
              value={new BigNumber(balance).toString()}
              thousandSeparator
              decimalScale={2}
            />
          </Typography>
        </FlexBox>
      )
    },
  },
]

interface Props {
  address: string
}

const ImpactTokens: React.FC<Props> = ({ address }) => {
  const [data] = useState<any[]>([
    // {
    //   coinDenom: 'supa',
    //   network: 'SupaMoto Malawi Collection',
    //   balance: 0,
    //   coinImageUrl: undefined,
    //   lastPriceUsd: undefined,
    // },
  ])

  const handleRowClick = (state: any) => () => {
    console.log('handleRowClick', { state })
  }

  return (
    <FlexBox width='100%' $direction='column' $gap={3}>
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
            $alignItems='center'
            $justifyContent='center'
            $borderRadius='8px'
            background='#053549'
          >
            <Typography variant='primary' size='lg' color='dark-blue'>
              This account holds no Impact Tokens
            </Typography>
          </FlexBox>
        )}
      </TableWrapper>
    </FlexBox>
  )
}

export default ImpactTokens
