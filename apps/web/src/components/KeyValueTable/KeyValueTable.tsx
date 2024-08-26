import React, { useState } from 'react'
import { CSSProperties, Table, rem } from '@mantine/core'
import { KeyValueProps, useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { get } from 'lodash'

export type Column = {
  title: string
  render: (row: any) => string | JSX.Element
  style?: Partial<Record<'th' | 'td', CSSProperties>>
}

type KeyValueTableProps = {
  data: any[]
  columns: Column[]
  themeColor?: string
  collapsible?: (props: { row: any; selectedId: string }) => JSX.Element
  valueType: KeyValueProps['type']
  primaryId?: string
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

const KeyValueTable = ({
  data,
  columns,
  themeColor,
  collapsible: Collapsible,
  valueType,
  primaryId,
}: KeyValueTableProps) => {
  const { setKeyValue, keyValue, selectedId, setSelectedId } = useKeyValueViewerContext()

  const handleRowClick = (entry: any) => {
    console.log({ type: valueType, data: entry })
    setKeyValue({ type: valueType, data: entry })
    const entityId = get(entry, primaryId ?? 'id')
    console.log({ entityId })

    if (selectedId === entityId) {
      setSelectedId(null)
    } else {
      setSelectedId(get(entry, primaryId ?? 'id'))
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Table
        verticalSpacing='lg'
        w='100%'
        withRowBorders={false}
        style={{ borderCollapse: 'separate', borderSpacing: `0 ${rem(5)}`, width: '100%' }}
      >
        <Table.Thead>
          <Table.Tr style={{ padding: 0 }}>
            {columns.map((column, index) => (
              <Table.Th key={index} c='gray.5' styles={{ th: { color: '#9A9A9A', ...column.style?.th } }}>
                {column.title}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((entry: any) => (
            <React.Fragment key={get(entry, primaryId ?? 'id')}>
              <Table.Tr
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#F8F8F8',
                }}
                onClick={() => handleRowClick(entry)}
              >
                {columns.map((column, colIndex) => {
                  const borderStyles = getBorderStyles(
                    get(entry, primaryId ?? 'id') === selectedId && Boolean(keyValue),
                    colIndex,
                    columns.length,
                    themeColor,
                  )
                  return (
                    <Table.Td style={{ ...borderStyles, ...column.style?.td, fontWeight: 'bolder' }} key={colIndex}>
                      {column.render(entry)}
                    </Table.Td>
                  )
                })}
              </Table.Tr>
              {Collapsible && (
                <Table.Tr style={{ width: '100%' }}>
                  <Table.Td colSpan={columns.length} style={{ padding: 0, width: '100%' }}>
                    <Collapsible row={entry} selectedId={selectedId ?? ''} />
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
