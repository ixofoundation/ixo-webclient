import React, { Fragment } from 'react'
import { useTable } from 'react-table'
import { useTransition } from 'react-spring'
import {
  TableContainer,
  StyledTableHeader,
  StyledTableCell,
  StyledTableRow,
  NavLink,
  // StyledMobileRow,
  // StyledMobileBuyCell,
  // StyledDateWrapper,
  // StyledAmountWrapper,
} from './Table.styles'
import Value from './TableCellValue'
// import { useWindowSize } from 'common/hooks'

interface TableProps {
  columns: object
  data: object[]
}

const renderCell = (cell: any): any => {
  switch (cell.column.id) {
    case 'validator':
      return <img alt="" src={require('assets/img/relayer.png')} />
    case 'name':
    	return <NavLink href={cell.value.link ?? ''} target='_blank' rel="noopener noreferrer">{cell.value.text}</NavLink>
		case 'mission':
			return <>{cell.value && (cell.value.length > 50 ? cell.value.substring(0, 50) + '...' : cell.value)}</>
    case 'value':
			const { name: { text: moniker }, validatorAddress } = cell.row.original
      return <Value value={cell.value} moniker={moniker} validatorAddress={validatorAddress} />
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
  } = useTable({
    columns,
    data,
  })
//   const size = useWindowSize()
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
    <TableContainer>
      <table {...getTableProps()}>
        {/* {size.width > 1024 && ( */}
          <thead>
            {headerGroups.map((headerGroup, groupIndex) => (
              <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <StyledTableHeader {...column.getHeaderProps()} align={column.align}>
                    {column.render('Header')}
                  </StyledTableHeader>
                ))}
              </tr>
            ))}
          </thead>
        {/* )} */}
        <tbody {...getTableBodyProps()}>
          {transitions.map(({ item, key, props }) => {
            prepareRow(item)
            return (
              <Fragment key={`table-body-${key}`}>
                {renderDesktopTableRow(item, props)}
                {/* {size.width > 1024 && renderDesktopTableRow(item, props)}
                {size.width <= 1024 && renderMobileTableRow(item)} */}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </TableContainer>
  )
}

export default Table
