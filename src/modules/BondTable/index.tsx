import React, { useMemo, Fragment, useState } from 'react'
import { useTable } from 'react-table'
import moment from 'moment'
import _ from 'lodash'
import { useSpring, animated } from 'react-spring'
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

interface TableProps {
  columns: object
  data: {
    date: number
    buySell: boolean
    quantity: number
    price: number
    value: number
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
  } else if (cell.column.id === 'buySell') {
    return cell.value ? 'Buy' : 'Sell'
  } else if (cell.column.id === 'value') {
    return <ValueComponent value={cell.value} />
  } else {
    return cell.render('Cell')
  }
}

const renderDesktopTableRow = (row, updateRow): any => (
  <StyledTableRow
    {...row.getRowProps()}
    onClick={(): void => updateRow(row.id)}
  >
    {row.cells.map(cell => {
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
  const updatedRows = rows.map(function(val) {
    val.expended = false
    return val
  })

  const getSpringAnimation = expanded => {
    const props = useSpring({
      to: {
        height: expanded ? '100px' : '0px',
        width: expanded ? '100%' : '0px',
        background: 'red',
      },
      from: {
        height: !expanded ? '100px' : '0px',
        width: !expanded ? '100%' : '0px',
        background: 'red',
      },
    })

    return props
  }

  // const initialState = [...rows]
  // const [collapsibleRow, setCollapsibleRow] = useState([])
  const [expandableRowData, setExpandableRowData] = useState([...updatedRows])
  const updateRow = (id: number): void => {
    const copyExpendableRowData = [...expandableRowData]
    const selectedRowIndex = _.findIndex(
      copyExpendableRowData,
      row => row.id === id,
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
              {headerGroup.headers.map(column => (
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
              <animated.tr
                style={getSpringAnimation(row.expended)}
              ></animated.tr>
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
