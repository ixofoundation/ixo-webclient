import React, { useMemo, Fragment } from 'react'
import {
  TableContainer,
  StyledHeader,
} from './PriceTable/index.style'
import Table from './PriceTable'
import StakeTransactionTable from './StakeTransactionTable'
import CapitalTransactionTable from './CapitalTransactionTable'

const tableData = [
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: false,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
]

interface Props {
  selectedHeader: string
}

export const BondTable: React.SFC<Props> = ({ selectedHeader }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Buy/Sell',
        accessor: 'buySell',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    [],
  )

  return (
    <Fragment>
      {
        selectedHeader === 'price' && (
          <Fragment>
            <StyledHeader>EDU Transactions</StyledHeader>
            <TableContainer>
              <Table columns={columns} data={tableData} />
            </TableContainer>
          </Fragment>
        )
      }
      {
        selectedHeader === 'stake' && (
          <StakeTransactionTable />
        )
      }
      {
        selectedHeader === 'raised' && (
          <CapitalTransactionTable />
        )
      }
      {
        selectedHeader === 'reverse' && (
          <CapitalTransactionTable />
        )
      }
    </Fragment>
  )
}

export default BondTable
