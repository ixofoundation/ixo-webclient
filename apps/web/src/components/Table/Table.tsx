import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { useTable, Column, useSortBy } from 'react-table'

// Create a default prop getter
const defaultPropGetter = () => ({})

export type TableColumnProp = any
export interface TableProps {
  columns: Column<TableColumnProp>[]
  data: object[]
  getHeaderProps?: (column: TableColumnProp) => any
  getColumnProps?: (column: TableColumnProp) => any
  getRowProps?: (column: TableColumnProp) => any
  getCellProps?: (column: TableColumnProp) => any
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  )

  return (
    <table {...getTableProps()} cellPadding='0' cellSpacing='0'>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={'header-row' + index}>
            {headerGroup.headers.map((column: any, index) => {
              const headerProps = [
                {
                  className: column.className,
                  style: column.style,
                },
                getColumnProps(column),
                getHeaderProps(column),
              ]
              if (column.sortable) {
                headerProps.push(column.getSortByToggleProps())
              }
              return (
                <th
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps(headerProps)}
                  key={'th' + index}
                >
                  {column.render('Header')}
                  {column.sortable && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? column.customSortIcon?.desc ?? ' 🔽'
                          : column.customSortIcon?.asc ?? ' 🔼'
                        : column.customSortIcon?.no ?? ''}
                    </span>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps(getRowProps(row))} key={'body-row' + i}>
              {row.cells.map((cell, i) => {
                return (
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: (cell.column as any).className,
                        style: (cell.column as any).style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                    key={'td' + i}
                  >
                    {(cell.column as any).renderCell ? (cell.column as any).renderCell(cell) : cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table

export const renderTableHeader = (name: string, justifyContent = 'flex-start') => (
  <FlexBox
    p={4}
    justifyContent={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </FlexBox>
)
