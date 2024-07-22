import { useTheme } from "styled-components";

export default function TableRowStyles() {
  const theme = useTheme();

  return (
    <style>{`
    .base-table__row td {
      border: solid 1px ${theme.transparent} !important;
      border-style: solid none solid none !important;
    }

    .base-table__row--active td {
      border: solid 1px ${theme.accentActive} !important;
      border-style: solid none solid none !important;
    }
    
    .base-table__row td:first-child {
      border-bottom-left-radius: 20px !important;
      border-top-left-radius: 20px !important;
      border-left-style: solid !important;
    }
    
    .base-table__row td:last-child {
      border-top-right-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
      border-right-style: solid !important;
    }
    .base-table__row--active td:first-child {
      border-bottom-left-radius: 20px !important;
      border-top-left-radius: 20px !important;
      border-left-style: solid !important;
    }
    
    .base-table__row--active td:last-child {
      border-top-right-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
      border-right-style: solid !important;
    }
`}</style>
  );
}
