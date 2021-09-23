import React, { useMemo, Fragment, useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { useTransition } from 'react-spring'
import moment from 'moment'

// import { useSpring, animated } from 'react-spring'
import {
  TableContainer,
  StyledTableHeader,
  StyledTableCell,
  StyledTableRow,
  DateContainer,
  StyledMobileRow,
  StyledMobileBuyCell,
  StyledDateWrapper,
  StyledAmountWrapper,
  StyledHeader,
} from './BondTable.style'
import ValueComponent from './ValueComponent'
import { useWindowSize } from 'common/hooks'
import { RootState } from 'common/redux/types'
import { useSelector } from 'react-redux'
import { TransactionInfo } from 'modules/Account/types'

// const tableData = [
//   {
//     date: Date.now(),
//     status: 'Approved',
//     transaction: 'Buy',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     status: 'Pending',
//     transaction: 'Send',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     status: 'Approved',
//     transaction: 'Receive',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     status: 'Failed',
//     transaction: 'Swap',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     status: 'Approved',
//     transaction: 'Sell',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
// ]

interface TableProps {
  columns: object
  data: {
    date: number
    transaction: string
    quantity: number
    price: number
    in: string
    out: number
  }[]
}

const renderCell = (cell: any): any => {
  if (cell.column.id === 'date') {
    return (
      <DateContainer>
        <span>{moment(cell.value).format('DD MMM YY')}</span>
        <span>{moment(cell.value).format('HH:SS')}</span>
      </DateContainer>
    )
  } else if (cell.column.id === 'out') {
    return <ValueComponent value={cell.value} />
  } else {
    return cell.render('Cell')
  }
}

const renderDesktopTableRow = (row, props): any => (
  <StyledTableRow {...row.getRowProps()} style={props}>
    {row.cells.map((cell) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <StyledTableCell
          {...cell.getCellProps()}
          header={cell.column.id}
          type={cell.value}
        >
          {renderCell(cell)}
        </StyledTableCell>
      )
    })}
  </StyledTableRow>
)

const renderMobileTableRow = (row): any => {
  return (
    <StyledMobileRow {...row.getRowProps()}>
      <StyledMobileBuyCell
        header={row.cells[1].column.id}
        type={row.cells[1].value}
      >
        {renderCell(row.cells[1])}
      </StyledMobileBuyCell>
      <div className="d-flex text-white">
        <StyledAmountWrapper>
          <span className="mr-5">{renderCell(row.cells[2])}</span>
          <span>Quantity</span>
        </StyledAmountWrapper>
        <StyledAmountWrapper>
          <span>{renderCell(row.cells[3])}</span>
          <span>Price</span>
        </StyledAmountWrapper>
      </div>
      <StyledDateWrapper>
        <span>{renderCell(row.cells[0])}</span>
        <span>{renderCell(row.cells[4])}</span>
      </StyledDateWrapper>
    </StyledMobileRow>
  )
}

const Table: React.SFC<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
  const size = useWindowSize()
  const updatedRows = rows.map(function (val, key) {
    val.key = `table-row-${key}`
    return val
  })
  // const initialState = [...rows]
  // const [collapsibleRow, setCollapsibleRow] = useState([])
  const transitions = useTransition(updatedRows, (item) => item.key, {
    from: { transform: 'translate3d(-400px,0,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    // leave: { transform: 'translate3d(0,0,0)' },
    config: { duration: 0 },
  })
  return (
    <table {...getTableProps()}>
      {size.width > 1024 && (
        <thead>
          {headerGroups.map((headerGroup, groupIndex) => (
            <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <StyledTableHeader {...column.getHeaderProps()}>
                  {column.render('Header')}
                </StyledTableHeader>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody {...getTableBodyProps()}>
        {transitions.map(({ item, key, props }) => {
          prepareRow(item)
          return (
            <Fragment key={`table-body-${key}`}>
              {size.width > 1024 && renderDesktopTableRow(item, props)}
              {size.width <= 1024 && renderMobileTableRow(item)}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

export const BondTable: React.SFC<{}> = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        width: '100px',
      },
      {
        Header: 'STATUS',
        accessor: 'status',
      },
      {
        Header: 'BUY/SELL',
        accessor: 'transaction',
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
        Header: 'VALUE',
        accessor: 'out',
      },
    ],
    [],
  )
  const { symbol } = useSelector((state: RootState) => state.activeBond)
  const { transactions } = useSelector((state: RootState) => state.account)
  const [tableData, setTableData] = useState([])

  const mapToStakeTable = (data: TransactionInfo[]): any[] => {
    return data.map((transaction: TransactionInfo) => ({
      date: transaction.date,
      status: 'Approved', //  placeholder
      transaction: transaction.type,
      quantity: transaction.quantity,
      price: transaction.price,
      out: transaction.quantity, // need to confirm
    }))
  }

  useEffect(() => {
    if (transactions.length > 0) {
      setTableData(
        mapToStakeTable(
          transactions.filter((transaction) => transaction.asset === symbol),
        ),
      )
    }
    // eslint-disable-next-line
  }, [transactions])

  return (
    <Fragment>
      <StyledHeader>{symbol.toUpperCase()} Transactions</StyledHeader>
      <TableContainer>
        <Table columns={columns} data={tableData} />
      </TableContainer>
    </Fragment>
  )
}

export default BondTable
