import React from 'react'
import { useTable } from 'react-table'
import { TableContainer, StyledTableHeader } from '../../Components/Table/Table.styles'
import { useWindowSize } from 'hooks/window'

interface TableProps {
  columns: object
  data: object[]
}

const Table: React.FunctionComponent<TableProps> = ({ columns, data }: any) => {
  const { getTableProps, headerGroups } = useTable({
    columns,
    data,
  })
  const size = useWindowSize()
  return (
    <TableContainer>
      <table {...getTableProps()}>
        {size.width! > 1024 && (
          <thead>
            {headerGroups.map((headerGroup, groupIndex) => (
              // @ts-ignore
              <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <StyledTableHeader {...column.getHeaderProps()}>{column.render('Header')}</StyledTableHeader>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {/* <tbody {...getTableBodyProps()}>
          {updatedRows.map(({ item, key }: any) => {
            prepareRow(item)
            return (
              <Fragment key={`table-body-${key}`}>
                {size.width! > 1024 && renderDesktopTableRow(item)}
                {size.width! <= 1024 && renderMobileTableRow(item)}
              </Fragment>
            )
          })}
        </tbody> */}
      </table>
    </TableContainer>
  )
}

export default Table
