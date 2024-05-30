import { Table, TableThProps, rem } from '@mantine/core';
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext';

export type Column = {
  title: string;
  render: (row: any) => string | JSX.Element;
  style?: TableThProps
}

type KeyValueTableProps = {
  data: any[];
  columns: Column[];
}

const KeyValueTable = ({ data, columns }: KeyValueTableProps) => {
  const { setKeyValue } = useKeyValueViewerContext();

  return (
    <Table
      verticalSpacing='lg'
      mt={20}
      w='70%'
      withRowBorders={false}
      style={{ borderCollapse: 'separate', borderSpacing: `0 ${rem(5)}` }}
    >
      <Table.Thead>
        <Table.Tr>
          {columns.map((column, index) => (
            <Table.Th key={index} {...column.style}>
              {column.title}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.filter(entry => entry?.type && entry?.serviceEndpoint).map((entry: any) => (
          <Table.Tr key={entry.id} p={10} bg='#EBEBEB' onClick={() => setKeyValue(entry)}>
            {columns.map((column, colIndex) => (
              <Table.Td key={colIndex}>
                {column.render(entry)}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default KeyValueTable;
