import React, { useMemo, Fragment } from 'react'
import {
  TableContainer,
  StyledHeader,
} from './PriceTable/index.style'
import Table from './PriceTable'

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

export const BondTable: React.SFC<{}> = () => {
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
      <StyledHeader>EDU Transactions</StyledHeader>
      <TableContainer>
        <Table columns={columns} data={tableData} />
      </TableContainer>
    </Fragment>
  )
}

export default BondTable
