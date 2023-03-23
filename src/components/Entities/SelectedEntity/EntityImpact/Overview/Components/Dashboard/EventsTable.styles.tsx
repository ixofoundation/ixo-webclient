import styled from 'styled-components'
import { animated } from 'react-spring'
import { deviceWidth } from 'constants/device'

interface StyledTableCellProps {
  header: string
  type: boolean
}

export const TableContainer = styled.div`
  > div {
    width: 100%;
  }

  .ReactVirtualized__Table__row {
    width: 100% !important;
    background: #023044;
    margin-bottom: 3px;
  }
  .ReactVirtualized__Table__headerRow {
    width: 100% !important;
    color: ${(props: any): string => props.theme.ixoLightGreyBlue};
  }
  .ReactVirtualized__Table__Grid {
    width: 100% !important;
  }
  .ReactVirtualized__Table__Grid {
    width: 100% !important;
    border: none !important;
    outline: none !important;
  }
  .ReactVirtualized__Grid__innerScrollContainer {
    width: 100% !important;
    max-width: initial !important;
  }

  table {
    border: none;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 3px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      td:first-child {
        &:before {
          content: '';
          width: 0.7rem;
          height: 2.5rem;
          border-radius: 3.5rem;
          background: #85ad5c;
          display: block;
          position: absolute;
          top: 15px;
          left: -0.3rem;
        }
      }

      &.pending {
        td:first-child {
          &:before {
            background: #f89d28;
          }
        }
      }

      &.warning {
        td:first-child {
          &:before {
            background: #e2223b;
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      border: none;
      font-weight: 400;

      :last-child {
        border-right: 0;
      }

      > div {
        height: 70px;
        display: flex;
        align-items: center;
      }
    }

    th {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
`

export const StyledTableHeader = styled.th`
  color: #688ea0;
  text-transform: uppercase;
  &:first-child {
    padding-left: 2em;
  }
`

export const StyledTableCell = styled.td<StyledTableCellProps>`
  color: ${(props: any): string => (props.header === 'buySell' ? (props.type ? '#6FCF97' : '#E2223B') : 'white')};
  &:first-child {
    padding-left: 2em;
  }
  &:last-child {
    padding: 0;
    height: 100%;
  }
`

export const StyledTableRow = styled(animated.tr)`
  background-color: #023044;
  line-height: 1rem;
  height: 4.75rem;
`

export const DateContainer = styled.div`
  display: flex;
  span {
    &:last-child {
      font-size: 0.875rem;
      color: #83d9f2;
      margin-left: 0.25rem;
    }
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    line-height: 0.75rem;
    flex-direction: column;
    font-size: 0.875rem;

    span {
      &:last-child {
        font-size: 0.75rem;
        margin-left: 0rem;
      }
    }
  }
`

export const StyledMobileRow = styled.div`
  display: flex;
  flex-direction: column;
  background: #023044;
  padding: 10px;
  position: relative;

  @media (max-width: ${deviceWidth.mobile}px) {
    margin-bottom: 3px;
    padding-bottom: 0;
    padding-right: 0;
    padding-left: 1rem;
    padding-top: 0.9rem;
  }

  &:before {
    content: '';
    width: 0.5rem;
    height: 2.125rem;
    border-radius: 3.5rem;
    background: #85ad5c;
    display: block;
    position: absolute;
    bottom: 4px;
    left: -0.2rem;
  }

  &.pending {
    &:before {
      background: #f89d28;
    }
  }

  &.warning {
    &:before {
      background: #e2223b;
    }
  }
`

export const StyledMobileBuyCell = styled.div<StyledTableCellProps>`
  color: white;
  font-size: 10px;
`

export const StyledDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-top: 10px;
  span {
    &:last-child {
      width: 60%;
      & > div {
        div: last-child {
          width: 3em;
        }
        padding-left: 1em;
      }
    }
  }
`

export const StyledAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      text-transform: uppercase;
      color: #688ea0;
    }
  }
  &:last-child {
    margin-left: 30px;
  }
`

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`

export const StyledMobilePurposeCell = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

export const StyledMobileDescriptionCell = styled.div`
  font-size: 1rem;
`
