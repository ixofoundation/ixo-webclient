import React, { Fragment, useContext } from 'react'
import { useTable, usePagination } from 'react-table'
import moment from 'moment'
import { useTransition } from 'react-spring'
import { useWindowSize } from 'common/hooks'
import { BigNumber } from 'bignumber.js'

import Value from './Value'
import { DashboardThemeContext } from './Dashboard'

import {
  TableContainer,
  StyledTableHeader,
  StyledTableCell,
  StyledTableRow,
  NavLink,
  ValidatorLogo,
  // StyledMobileRow,
  // StyledMobileBuyCell,
  // StyledDateWrapper,
  // StyledAmountWrapper,
  DateContainer,
} from './Table.styles'
import Delegation from './TableCellDelegation'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'
interface TableProps {
  columns: object
  data: object[]
}

const renderCell = (cell: any): any => {
  switch (cell.column.id) {
    case 'date':
      return (
        <DateContainer>
          {cell.row.original.status && (
            <span
              className={`status-mark ${cell.row.original.status.toLowerCase()}`}
            ></span>
          )}
          <span>{moment(cell.value).format('DD MMM YY')}</span>
          <span>{moment(cell.value).format('HH:SS')}</span>
        </DateContainer>
      )
    case 'buySell':
      return cell.value ? (
        <span style={{ color: '#85AD5C' }}>Send</span>
      ) : (
        <span style={{ color: '#E2223B' }}>Send</span>
      )
    case 'value':
      return <Value value={cell.value} />
    case 'vote':
      return <Value value={cell.value} preIcon={false} />
    case 'logo':
      return <ValidatorLogo alt="" src={cell.value} />
    case 'name':
      return (
        <NavLink
          href={cell.row.original.website ?? ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cell.value}
        </NavLink>
      )
    case 'mission':
      return (
        <>
          {cell.value &&
            (cell.value.length > 50
              ? cell.value.substring(0, 50) + '...'
              : cell.value)}
        </>
      )
    case 'votingPower':
      return (
        <>
          {thousandSeparator(
            Number(getBalanceNumber(new BigNumber(cell.value))),
            ',',
          )}
        </>
      )
    case 'description':
      return (
        <>
          {cell.value &&
            (cell.value.length > 50
              ? cell.value.substring(0, 50) + '...'
              : cell.value)}
        </>
      )
    case 'commission':
      return <>{Number(cell.value * 100).toFixed(0)}%</>
    case 'delegation': {
      const delegation = cell.value
      const reward = cell.row.original.reward
      const address = cell.row.original.address
      return (
        <Delegation
          delegation={
            thousandSeparator(delegation?.amount.toFixed(0) ?? 0, ',') +
            ' ' +
            (delegation ? delegation.denom?.toUpperCase() : '')
          }
          reward={
            '(+' + thousandSeparator(reward?.amount.toFixed(0) ?? 0, ',') + ')'
          }
          address={address}
        />
      )
    }
    default:
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
          align={cell.column.align}
        >
          {renderCell(cell)}
        </StyledTableCell>
      )
    })}
  </StyledTableRow>
)

// const renderMobileTableRow = (row): any => {
//   return (
//     <StyledMobileRow {...row.getRowProps()}>
//       <StyledMobileBuyCell
//         header={row.cells[1].column.id}
//         type={row.cells[1].value}
//       >
//         {renderCell(row.cells[1])}
//       </StyledMobileBuyCell>
//       <div className="d-flex text-white">
//         <StyledAmountWrapper>
//           <span className="mr-5">{renderCell(row.cells[2])}</span>
//           <span>Quantity</span>
//         </StyledAmountWrapper>
//         <StyledAmountWrapper>
//           <span>{renderCell(row.cells[3])}</span>
//           <span>Price</span>
//         </StyledAmountWrapper>
//       </div>
//       <StyledDateWrapper>
//         <span>{renderCell(row.cells[0])}</span>
//         <span>{renderCell(row.cells[4])}</span>
//       </StyledDateWrapper>
//     </StyledMobileRow>
//   )
// }

const Table: React.FunctionComponent<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
  )
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

  const theme = useContext(DashboardThemeContext)
  return (
    <TableContainer className="w-100" theme={theme}>
      <table {...getTableProps()}>
        {size.width > 1024 && (
          <thead>
            {headerGroups.map((headerGroup, groupIndex) => (
              <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <StyledTableHeader
                    {...column.getHeaderProps()}
                    align={column.align}
                  >
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
                {/* {size.width <= 1024 && renderMobileTableRow(item)} */}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </TableContainer>
  )
}

export default Table
