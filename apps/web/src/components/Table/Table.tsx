import Image from 'next/image'
import React from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  Column,
  ColumnInstance,
  TableCellProps,
  Cell,
  Row,
  RowPropGetter,
  TableInstance,
  TableState,
} from 'react-table'
import { Flex, Pagination, Select } from '@mantine/core'
import { SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { IconSortGtoL } from 'components/IconPaths'
import { IconSortLtoG } from 'components/IconPaths'


// Create a default prop getter
const defaultPropGetter = () => ({})

export interface TableProps {
  columns: readonly Column<object>[]
  data: object[]
  getHeaderProps?: (column: any) => void
  getColumnProps?: (column: ColumnInstance<object>) => Partial<TableCellProps>
  getRowProps?: (row: Row<object>) => RowPropGetter<object>
  getCellProps?: (cell: Cell<object, any>) => Partial<TableCellProps>
}

interface TableStateWithPagination extends TableState<object> {
  pageIndex: number
  pageSize: number
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}): JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithPagination>,
    },
    useSortBy,
    usePagination,
  ) as TableInstance<object> & {
    page: Row<object>[]
    canPreviousPage: boolean
    canNextPage: boolean
    pageOptions: number[]
    pageCount: number
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void
    nextPage: () => void
    previousPage: () => void
    setPageSize: (pageSize: number) => void
    state: { pageIndex: number; pageSize: number }
  }

  return (
    <>
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
                  <th {...column.getHeaderProps(headerProps)} key={'th' + index}>
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
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(getRowProps(row))} key={'body-row' + i}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
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
      <Flex className='pagination' justify={'center'} align='center' w='100%' pt={10}>
        <Pagination total={pageCount} onChange={(page) => gotoPage(page - 1)} />

        <Select
          ml={10}
          w='200px'
          value={pageSize.toString()}
          onChange={(e) => setPageSize(Number(e))}
          data={['10', '20', '30', '40', '50']}
        />
      </Flex>
    </>
  )
}

export default Table

export const renderTableHeader = (
  name: string,
  justifyContent = 'flex-start',
  sort?: { direction: 'asc' | 'desc' | undefined; onClick: () => void },
) => (
  <Flex
    p={16}
    justify={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
    align='center'
    gap={16}
    {...(sort ? { onClick: sort.onClick } : {})}
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
    {sort && (
      <SvgBox color={theme.ixoDarkBlue}>
        {sort.direction !== 'desc' && <Image src={IconSortLtoG} alt='SortLtoG' width={5} height={5} color={theme.colors.blue[5]} />}
        {sort.direction === 'desc' && <Image src={IconSortGtoL} alt='SortGtoL' width={5} height={5} color={theme.colors.blue[5]} />}
      </SvgBox>
    )}
  </Flex>
)
