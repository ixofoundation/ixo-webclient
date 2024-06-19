import React, { useState } from 'react'
import { Table, TableThProps, rem } from '@mantine/core'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'

export type Column = {
  title: string
  render: (row: any) => string | JSX.Element
  style?: TableThProps
}

type KeyValueTableProps = {
  data: any[]
  columns: Column[]
  themeColor?: string
}

function getBorderStyles(isActive: boolean, index: number, totalColumns: number, themeColor?: string) {
  const borderStyle = `1px solid ${themeColor ?? 'black'}` // You can customize the border style here

  if (index === 0) {
    return {
      ...(isActive && { borderLeft: borderStyle }),
      ...(isActive && { borderTop: borderStyle }),
      ...(isActive && { borderBottom: borderStyle }),
      borderTopLeftRadius: rem(8),
      borderBottomLeftRadius: rem(8),
    }
  } else if (index === totalColumns - 1) {
    return {
      ...(isActive && { borderRight: borderStyle }),
      ...(isActive && { borderTop: borderStyle }),
      ...(isActive && { borderBottom: borderStyle }),
      borderTopRightRadius: rem(8),
      borderBottomRightRadius: rem(8),
    }
  } else {
    return {
      ...(isActive && { borderTop: borderStyle }),
      ...(isActive && { borderBottom: borderStyle }),
    }
  }
}

const KeyValueTable = ({ data, columns, themeColor }: KeyValueTableProps) => {
  const { setKeyValue } = useKeyValueViewerContext()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleRowClick = (entry: any) => {
    setKeyValue(entry)
    setSelectedId(entry.id)
  }

  return (
    <Table
      verticalSpacing='lg'
      mt={20}
      w='70%'
      withRowBorders={false}
      style={{ borderCollapse: 'separate', borderSpacing: `0 ${rem(5)}` }}
    >
      <Table.Thead>
        <Table.Tr style={{ padding: 0}}>
          {columns.map((column, index) => (
            <Table.Th key={index} style={{ color: "#9A9A9A" }} {...column.style} >
              {column.title}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data
          ?.filter((entry) => entry?.type && entry?.serviceEndpoint)
          .map((entry: any) => (
            <Table.Tr
              key={entry.id}
              style={{
                cursor: 'pointer',
                backgroundColor: '#F8F8F8',
              }}
              onClick={() => handleRowClick(entry)}
            >
              {columns.map((column, colIndex) => {
                const borderStyles = getBorderStyles(entry.id === selectedId, colIndex, columns.length, themeColor)
                return (
                  <Table.Td style={{ ...borderStyles, fontWeight: 'bolder' }} key={colIndex}>
                    {column.render(entry)}
                  </Table.Td>
                )
              })}
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
  )
}

export default KeyValueTable
