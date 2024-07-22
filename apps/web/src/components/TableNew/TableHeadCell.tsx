import { CSSProperties } from "react";

import { Flex, Text } from "@mantine/core";
import SortUpIcon from "@/assets/icons/sort-amount-up.svg";
import SortDownIcon from "@/assets/icons/sort-amount-down.svg";

import { IBaseTableConfig } from "./types";
import { useTheme } from "styled-components";
import { LiaCaretDownSolid, LiaCaretUpSolid } from "react-icons/lia";

type Props<T> = {
  config: IBaseTableConfig<T>;
  centerHeaders?: boolean;
  onSort?: (arg: string) => void;
  tableHeadCellStyles?: CSSProperties & {
    tableHeadText?: CSSProperties;
  };
};

export default function TableHeadCell<T>({
  config: { name, isSortable = false, sortOrder, value },
  onSort,
  centerHeaders = false,
  tableHeadCellStyles,
}: Props<T>) {
  const isSortOrderActive = sortOrder !== "default";
  const palette = useTheme();

  if (!isSortable || !onSort || !value) {
    return (
      <th
        key={name}
        style={{
          borderBottom: "none",
          color: palette.Neutral800,
          width: 85,
          padding: "0 0 5px 0",
          ...tableHeadCellStyles,
        }}
      >
        <Flex justify={centerHeaders ? "center" : "flex-start"}>
          <Text size="sm" pr={5} style={{ ...tableHeadCellStyles?.tableHeadText }}>
            {name}
          </Text>
        </Flex>
      </th>
    );
  }

  return (
    <th
      key={name}
      onClick={() => isSortable && onSort(value)}
      style={{
        cursor: "pointer",
        color: isSortOrderActive && isSortable ? palette.accentActive : palette.Black,
        width: 85,
        padding: "0 0 5px 0",
        ...tableHeadCellStyles,
      }}
    >
      <Flex justify={centerHeaders ? "center" : "flex-start"}>
        <Text
          fw={isSortOrderActive && isSortable ? 800 : 300}
          size="sm"
          pr={5}
          style={{ ...tableHeadCellStyles?.tableHeadText }}
        >
          {name}
        </Text>
        {sortOrder === "ascending" && (
          <LiaCaretDownSolid/>
        )}
        {sortOrder === "descending" && (
          <LiaCaretUpSolid/>
        )}
      </Flex>
    </th>
  );
}
