import React, { useMemo, Fragment, useState } from 'react'
import { useTable } from 'react-table'
import moment from 'moment'
import _ from 'lodash'
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
import { InComponent, OutComponent } from './ValueComponent'
import { useWindowSize } from 'common/hooks'

const tableData = [
  {
    date: Date.now(),
    transaction: 'Buy',
    quantity: 28,
    price: 12,
    in: '0.5000BTC',
    out: 86,
  },
  {
    date: Date.now(),
    transaction: 'Send',
    quantity: 28,
    price: 12,
    in: '0.5000BTC',
    out: 86,
  },
  {
    date: Date.now(),
    transaction: 'Receive',
    quantity: 28,
    price: 12,
    in: '0.5000BTC',
    out: 86,
  },
  {
    date: Date.now(),
    transaction: 'Swap',
    quantity: 28,
    price: 12,
    in: '0.5000BTC',
    out: 86,
  },
  {
    date: Date.now(),
    transaction: 'Sell',
    quantity: 28,
    price: 12,
    in: '0.5000BTC',
    out: 86,
  },
]

interface TableProps {
  columns: object
  data: {
    date: number
    transaction: string
    quantity: number
    price: number
    in: string,
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
  } else if (cell.column.id === 'in') {
    return <InComponent value={cell.value} />
  }  else if (cell.column.id === 'out') {
    return <OutComponent value={cell.value} />
  } else {
    return cell.render('Cell')
  }
}

const renderDesktopTableRow = (row, updateRow): any => (
  <StyledTableRow
    {...row.getRowProps()}
    onClick={(): void => updateRow(row.id)}
  >
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

const renderMobileTableRow = (row, updateRow): any => {
  return (
    <StyledMobileRow
      {...row.getRowProps()}
      onClick={(): void => updateRow(row.id)}
    >
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
  const updatedRows = rows.map(function (val) {
    val.expended = false
    return val
  })

  // const initialState = [...rows]
  // const [collapsibleRow, setCollapsibleRow] = useState([])
  const [expandableRowData, setExpandableRowData] = useState([...updatedRows])
  const updateRow = (id: number): void => {
    const copyExpendableRowData = [...expandableRowData]
    const selectedRowIndex = _.findIndex(
      copyExpendableRowData,
      (row) => row.id === id,
    )
    const updatedRow = {
      ...copyExpendableRowData[selectedRowIndex],
      expended: !copyExpendableRowData[selectedRowIndex].expended,
    }
    copyExpendableRowData.splice(selectedRowIndex, 1, updatedRow)
    setExpandableRowData(copyExpendableRowData)
  }

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
        {expandableRowData.map((row, i) => {
          prepareRow(row)
          return (
            <Fragment key={`table-body-${i}`}>
              {size.width > 1024 && renderDesktopTableRow(row, updateRow)}
              {size.width <= 1024 && renderMobileTableRow(row, updateRow)}
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
        width: '100px'
      },
      {
        Header: 'TRANSACTION',
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
        Header: 'IN',
        accessor: 'in',
      },
      {
        Header: 'OUT',
        accessor: 'out',
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
