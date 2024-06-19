import { CSSProperties } from "react";
import { Text } from "@mantine/core";

import TableCell from "./TableCell";
import TableRowStyles from "./TableRow.styles";
import { IBaseTableConfig } from "./types";

type Props<T> = {
  config: IBaseTableConfig<T>[];
  onRowSelect?: (rowData: T) => void;
  isSelected?: boolean;
  rowData: T;
  centerCells?: boolean;
  tableCellStyles?: CSSProperties;
  tableRowStyles?: CSSProperties;
};

export default function TableRow<T>({
  config,
  onRowSelect,
  rowData,
  isSelected,
  centerCells,
  tableCellStyles,
  tableRowStyles,
}: Props<T>) {
  return (
    <>
      <TableRowStyles />
      <tr
        style={tableRowStyles}
        className={`${isSelected ? "base-table__row--active" : "base-table__row"}`}
        onClick={() => onRowSelect?.(rowData)}
      >
        {config?.map(({ id, name, sortOrder, isSortable, currentCellStyles, component }) => {
          return (
            <TableCell
              tableCellStyles={tableCellStyles}
              currentCellStyles={currentCellStyles}
              sortOrder={sortOrder}
              key={id}
              isSortable={isSortable}
              data-testid={`table-cell-${name}`}
            >
              {component ? (
                component(rowData)
              ) : (
                <Text size="md" ta={centerCells ? "center" : "start"}>
                  Incorrect data format
                </Text>
              )}
            </TableCell>
          );
        })}
      </tr>
    </>
  );
}
