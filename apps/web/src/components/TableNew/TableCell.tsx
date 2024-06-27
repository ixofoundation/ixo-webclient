import { CSSProperties, PropsWithChildren } from "react";
import { useTheme } from "styled-components";

type Props = PropsWithChildren<{
  isSelected?: boolean;
  sortOrder?: string;
  isSortable?: boolean;
  tableCellStyles?: CSSProperties;
  currentCellStyles?: CSSProperties;
  "data-testid"?: string;
}>;

export default function TableCell({
  children,
  isSelected,
  sortOrder,
  isSortable,
  tableCellStyles,
  currentCellStyles,
  "data-testid": datatestid,
}: Props) {
  const palette = useTheme();

  const isSortOrderActive = sortOrder !== "default";

  return (
    <td
      data-testid={datatestid}
      style={{
        color: isSortOrderActive && isSortable ? palette.accentActive : palette.Black,
        backgroundColor: isSelected ? palette.Neutral100 : palette.White,
        cursor: "pointer",
        paddingLeft: 2,
        border: "2px solid transparent",
        ...tableCellStyles,
        ...currentCellStyles,
      }}
    >
      {children}
    </td>
  );
}
