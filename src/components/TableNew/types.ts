import { CSSProperties, ReactNode } from "react";

export type IBaseTableConfig<TRowData, TValue extends string = string> = {
  id: string;
  name?: string;
  isSortable?: boolean;
  isCommaSeparated?: boolean;
  sortOrder?: "default" | "ascending" | "descending";
  component: (row: TRowData) => ReactNode | string;
  value?: TValue;
  currentCellStyles?: CSSProperties;
};

export type IColumnHeader = {
  name?: string;
  isSortable?: boolean;
  isCommaSeparated?: boolean;
  sortOrder?: "default" | "ascending" | "descending";
  cellField: string;
  isIconWithValueLink?: boolean;
  cellStyles?: CSSProperties;
};
