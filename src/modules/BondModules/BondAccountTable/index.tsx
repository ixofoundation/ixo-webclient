import React, { Fragment } from 'react'
import { useTable } from 'react-table'
import { useTransition } from 'react-spring'
import moment from 'moment'
import { TransactionInfo } from 'modules/Account/types'

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
  HeaderLabel,
  HeaderAction,
  /* DownloadAction,
  DownloadLabel,
  DownloadImage, */
  CreateAction,
} from './BondTable.style'
import { InComponent, OutComponent } from './ValueComponent'
import { useWindowSize } from 'common/hooks'

/* import IMG_DOWNLOAD from 'assets/images/exchange/download.svg' */

// const tableData = [
//   {
//     date: Date.now(),
//     type: 'Buy',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     type: 'Send',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     type: 'Receive',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     type: 'Swap',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
//   {
//     date: Date.now(),
//     type: 'Sell',
//     quantity: 28,
//     price: 12,
//     in: '0.5000BTC',
//     out: 86,
//   },
// ]

interface BondTableProps {
  handleDownloadCSV?: () => void
  handleNewTransaction?: () => void
  tableData?: TransactionInfo[]
  token?: string
}
interface TableProps {
  columns: object
  data: TransactionInfo[]
}

const renderCell = (cell: any): any => {
  if (cell.column.id === 'date') {
    return (
      <DateContainer>
        <span>{moment(cell.value).format('DD MMM YY')}</span>
        <span>{moment(cell.value).format('HH:ss')}</span>
      </DateContainer>
    )
  } else if (cell.column.id === 'in') {
    return <InComponent value={cell.value} />
  } else if (cell.column.id === 'out') {
    return <OutComponent value={cell.value} txhash={cell.row.original.txhash} />
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
    config: { duration: 1000 },
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
                  {}
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

export const BondTable: React.FC<BondTableProps> = ({
  handleNewTransaction,
  tableData,
}) => {
  const columns = [
    {
      Header: 'Date',
      accessor: 'date',
      width: '100px',
    },
    {
      Header: 'TRANSACTION',
      accessor: 'type',
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
  ]

  return (
    <Fragment>
      <StyledHeader>
        <HeaderLabel>Reserve Account Transactions (xEUR)</HeaderLabel>
        <HeaderAction>
          {/* <DownloadAction onClick={handleDownloadCSV}>
            <DownloadLabel>Download CSV</DownloadLabel>
            <DownloadImage src={IMG_DOWNLOAD} alt="Download CSV" />
          </DownloadAction> */}
          <CreateAction onClick={handleNewTransaction}>
            New Transaction
          </CreateAction>
        </HeaderAction>
      </StyledHeader>
      <TableContainer>
        {tableData && tableData.length > 0 && (
          <Table columns={columns} data={tableData} />
        )}
      </TableContainer>
    </Fragment>
  )
}

export default BondTable
