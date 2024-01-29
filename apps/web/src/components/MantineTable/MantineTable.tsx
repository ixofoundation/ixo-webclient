import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { Flex, Table as MantineTable } from '@mantine/core'

// Create a default prop getter
const defaultPropGetter = () => ({})

export const Table = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}: any): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  )

  return (
    <MantineTable horizontalSpacing='md' highlightOnHover {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <Flex {...headerGroup.getHeaderGroupProps()} key={`header-row + ${index}`} justify={'space-between'}>
            {headerGroup.headers.map((column: any, index) => {
              return (
                <Flex
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                    column.getSortByToggleProps(),
                  ])}
                  key={'th' + index}
                  w='100%'
                >
                  <Flex w='100%' align='center' justify='flex-start'>
                    {column.render('Header')}
                    {column.sortable && <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Flex
              h='100%'
              align='center'
              {...row.getRowProps(getRowProps(row))}
              key={'body-row' + i}
              justify={'space-between'}
            >
              {row.cells.map((cell, i) => {
                return (
                  <Flex
                    w='100%'
                    align='center'
                    mt={2}
                    bg='#023044'
                    h={48}
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
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </tbody>
    </MantineTable>
  )
}
