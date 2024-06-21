import React, { useState } from 'react'
import { Table, TableThProps, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { KeyValueProps, useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'

export type Column = {
  title: string
  render: (row: any) => string | JSX.Element
  style?: TableThProps
}

type KeyValueTableProps = {
  data: any[]
  columns: Column[]
  themeColor?: string
  collapsible?: (props: { opened: boolean }) => JSX.Element
  valueType: KeyValueProps['type']
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

const KeyValueTable = ({ data, columns, themeColor, collapsible: Collapsible, valueType }: KeyValueTableProps) => {
  const { setKeyValue, keyValue } = useKeyValueViewerContext()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [opened, { toggle }] = useDisclosure(false)

  const handleRowClick = (entry: any) => {
    if (Collapsible) {
      toggle()
    } else {
      setKeyValue({ type: valueType, data: entry })
    }

    if (selectedId === entry.id) {
      setSelectedId(null)
    } else {
      setSelectedId(entry.id)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Table
        verticalSpacing='lg'
        mt={20}
        w='100%'
        withRowBorders={false}
        style={{ borderCollapse: 'separate', borderSpacing: `0 ${rem(5)}`, width: '100%' }}
      >
        <Table.Thead>
          <Table.Tr style={{ padding: 0 }}>
            {columns.map((column, index) => (
              <Table.Th key={index} style={{ color: '#9A9A9A', ...column.style?.style }} {...column.style}>
                {column.title}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((entry: any) => (
            <React.Fragment key={entry.id}>
              <Table.Tr
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#F8F8F8',
                }}
                onClick={() => handleRowClick(entry)}
              >
                {columns.map((column, colIndex) => {
                  const borderStyles = getBorderStyles(
                    entry.id === selectedId && Boolean(keyValue),
                    colIndex,
                    columns.length,
                    themeColor,
                  )
                  return (
                    <Table.Td style={{ ...borderStyles, ...column.style?.style, fontWeight: 'bolder' }} key={colIndex}>
                      {column.render(entry)}
                    </Table.Td>
                  )
                })}
              </Table.Tr>
              {Collapsible && (
                <Table.Tr style={{ width: '100%' }}>
                  <Table.Td colSpan={columns.length} style={{ padding: 0, width: '100%' }}>
                    <Collapsible opened={opened} />
                  </Table.Td>
                </Table.Tr>
              )}
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default KeyValueTable
