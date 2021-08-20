import styled from 'styled-components'
import { animated } from 'react-spring'

interface StyledTableCellProps {
  header: string
  type: boolean
}

export const TableContainer = styled.div`
  background: linear-gradient(180deg, #012639 0%, #002D42 97.29%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border: 1px solid #0C3549;
  border-radius: 4px;
  padding: 22px;

  table {
    border: none;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.2em;

    tbody:before {
      content: '@';
      display: block;
      line-height: 10px;
      text-indent: -99999px;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      border: none;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export const StyledTableHeader = styled.th`
  color: #688EA0;
  text-transform: uppercase;
  text-align: ${(props: any): string => props.align ?? 'center'};
  &:first-child {
    padding-left: 2em;
  }
`

export const StyledTableCell = styled.td<StyledTableCellProps>`
  color: #FFFFFF;
  font-weight: normal;
  text-align: ${(props: any): string => props.align ?? 'center'};
  &:first-child {
    padding-left: 2em;
  }

  &:nth-child(2) {
    font-weight: 700;
  }
  &:last-child {
    padding: 0;
    height: 100%;
  }
`

export const StyledTableRow = styled(animated.tr)`
  background-color: #023044;
  line-height: 1em;
  height: 4em;
`

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      font-size: 0.6em;
      font-weight: normal;
    }
  }
`

export const StyledMobileRow = styled.div`
  display: flex;
  flex-direction: column;
  background: #023044;
  padding: 10px;
  font-weight: normal;

  @media (max-width: 768px) {
    padding-bottom: 0;
    padding-right: 0;
  }
`

export const StyledMobileBuyCell = styled.div<StyledTableCellProps>`
  color: ${(props: any): string =>
    props.header === 'buySell'
      ? props.type
        ? '#6FCF97'
        : '#E2223B'
      : 'white'};
  font-weight: normal;
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
