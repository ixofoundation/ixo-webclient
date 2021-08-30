import React, { Fragment, useContext } from 'react'
import { useTable, usePagination } from 'react-table'
import moment from 'moment'
import { useTransition } from 'react-spring'
import { useWindowSize } from 'common/hooks'

import styled from 'styled-components'
import { animated } from 'react-spring'
import Value from './Value'
import { DashboardThemeContext, ThemeContext } from './Dashboard'

interface StyledTableCellProps {
  header: string
  type: boolean
}

export const TableContainer = styled.div<{ theme: ThemeContext }>`
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f3f6fc 97.29%)'};

  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 4px;
  padding: 22px;

  table {
    border: none;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.2em;

    tbody:before {
      content: '@';
      display: block;
      line-height: 10px;
      text-indent: -99999px;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      border: none;

      :last-child {
        border-right: 0;
      }
    }

    th {
      color: ${({ theme }) => (theme.isDark ? '#688EA0' : '#373d3f')};
    }

    td {
      color: ${({ theme }) => (theme.isDark ? '#fff' : '#373d3f')};
    }
    tbody {
      tr {
        background: ${({ theme }) => (theme.isDark ? '#023044' : '#f7f9fd')};
      }
    }
  }
`

export const StyledTableHeader = styled.th`
  text-transform: uppercase;
  &:first-child {
    padding-left: 2em;
  }
`

export const StyledTableCell = styled.td<StyledTableCellProps>`
  font-weight: normal;
  &:first-child {
    padding-left: 2em;
  }

  &:nth-child(2) {
    font-weight: 700;
  }
  &:last-child {
    padding: 0;
    height: 100%;
  }
`

export const StyledTableRow = styled(animated.tr)`
  line-height: 1em;
  height: 4em;
`

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      font-size: 0.6em;
      font-weight: normal;
    }
  }
`

export const StyledMobileRow = styled.div`
  display: flex;
  flex-direction: column;
  background: #023044;
  padding: 10px;
  font-weight: normal;

  @media (max-width: 768px) {
    padding-bottom: 0;
    padding-right: 0;
  }
`

export const StyledMobileBuyCell = styled.div<StyledTableCellProps>`
  color: ${(props: any): string =>
    props.header === 'buySell'
      ? props.type
        ? '#6FCF97'
        : '#E2223B'
      : 'white'};
  font-weight: normal;
`

export const StyledDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-top: 10px;
  span {
    &:last-child {
      width: 60%;
      & > div {
        div: last-child {
          width: 3em;
        }
        padding-left: 1em;
      }
    }
  }
`

export const StyledAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      text-transform: uppercase;
      color: #688ea0;
    }
  }
  &:last-child {
    margin-left: 30px;
  }
`

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`

interface TableProps {
  columns: object
  data: object[]
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
    return cell.value ? (
      <span style={{ color: '#85AD5C' }}>Send</span>
    ) : (
      <span style={{ color: '#E2223B' }}>Send</span>
    )
  } else if (cell.column.id === 'value') {
    return <Value value={cell.value} />
  } else if (cell.column.id === 'vote') {
    return <Value value={cell.value} preIcon={false} />
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
    <TableContainer theme={theme}>
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
    </TableContainer>
  )
}

export default Table
