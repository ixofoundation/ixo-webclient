import { Table } from "@mantine/core";
import { CSSProperties } from "react";

import TableHeadCell from "./TableHeadCell";
import TableRow from "./TableRow";
import { IBaseTableConfig } from "./types";

type RowWithId = {
  id: string | number;
};

type Props<T extends RowWithId> = {
  rows?: T[];
  config: IBaseTableConfig<T>[];
  selectedRowId?: string | number;
  centerHeaders?: boolean;
  centerCells?: boolean;
  onRowSelect?: (row: T) => void;
  onSort?: (columnFieldName: string) => void;
  "data-testid"?: string;
  styles?: {
    cell?: CSSProperties;
    row?: CSSProperties;
    headers?: CSSProperties & {
      tableHeadText?: CSSProperties;
    };
    table?: CSSProperties;
    tableBody?: CSSProperties;
    tableHead?: CSSProperties;
  };
};

/**
 * @param {IBaseTableConfig[]} props.config contains elements which
 *  will affect table behavior by column headers:
 * - cellField - field from passed object
 * - isSortable - is current column header sortable
 * - isCommaSeparated - will separate number values by comma
 * - sortOrder - current sorting order to apply styles for icons
 * - cellContent - component to pass inside the table cell
 * @param {T} props.selectedRow - Generic represents single table row data,
 * such object has to contain id field
 */
export default function BaseTable2<T extends RowWithId>({
  rows,
  selectedRowId,
  config,
  onRowSelect,
  onSort,
  centerHeaders = false,
  centerCells = false,
  styles,
  ...props
}: Props<T>) {
  return (
    <Table
      highlightOnHover
      data-testid={props["data-testid"]}
      style={{
        alignSelf: "stretch",
        borderCollapse: "separate",
        borderSpacing: 0,
        ...styles?.table,
      }}
    >
      <thead style={styles?.tableHead}>
        <tr style={styles?.row}>
          {config?.length &&
            config.map((cellConfig) => (
              <TableHeadCell
                tableHeadCellStyles={styles?.headers}
                key={cellConfig.id}
                config={cellConfig}
                onSort={onSort}
                centerHeaders={centerHeaders}
              />
            ))}
        </tr>
      </thead>
      <tbody style={styles?.tableBody}>
        {rows?.length ? (
          rows.map((rowData) => (
            <TableRow
              tableCellStyles={styles?.cell}
              tableRowStyles={styles?.row}
              centerCells={centerCells}
              key={rowData.id}
              isSelected={selectedRowId === rowData?.id}
              onRowSelect={onRowSelect}
              rowData={rowData}
              config={config}
            />
          ))
        ) : (
          <tr style={{ textAlign: "center" }}>
            <td style={{ paddingTop: 20 }} colSpan={config.length} />
          </tr>
        )}
      </tbody>
    </Table>
  );
}
