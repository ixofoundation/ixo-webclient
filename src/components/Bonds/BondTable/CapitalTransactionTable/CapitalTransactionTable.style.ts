import styled from 'styled-components'
import { animated } from 'react-spring'

interface StyledTableCellProps {
  header: string
  type: boolean
}

function extractColor(value: any): string {
  switch (value) {
    case 'Buy':
      return '#00D2FF'
    case 'Send':
      return '#AD245C'
    case 'Receive':
      return '#5AB946'
    case 'Swap':
      return '#ED9526'
    case 'Sell':
      return '#E2223B'
    default:
      return 'white'
  }
}

export const TableContainer = styled.div`
  background: linear-gradient(180deg, #012639 0%, #002d42 97.29%);
  border: 1px solid #0c3549;
  border-radius: 4px;
  margin: 1rem 0;
  padding: 1rem;

  table {
    border: none;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5em;

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
  color: #688ea0;
  text-transform: uppercase;
  &:first-child {
    padding-left: 2em;
  }
  width: 16%;
`

export const StyledTableCell = styled.td<StyledTableCellProps>`
  color: ${(props: any): string => (props.header === 'transaction' ? extractColor(props.type) : 'white')};
  font-weight: bold;
  &:first-child {
    padding-left: 2em;
    &:before {
      content: ' ';
      position: absolute;
      top: 20px;
      left: -5px;
      width: 10px;
      height: calc(100% - 30px);
      border-radius: 54px;
      background: #85ad5c;
    }
  }
  &:last-child {
    padding: 0;
    height: 100%;
  }
`

export const StyledTableRow = styled(animated.tr)`
  background-color: #023044;
`

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:last-child {
      font-size: 0.6em;
      font-weight: normal;
      color: #83d9f2;
    }
    line-height: initial;
  }

  padding: 8px 0;
`

export const StyledMobileRow = styled.div`
  display: flex;
  flex-direction: column;
  background: #023044;
  padding: 10px;
  font-weight: bold;

  @media (max-width: 768px) {
    padding-bottom: 0;
    padding-right: 0;
  }
`

export const StyledMobileBuyCell = styled.div<StyledTableCellProps>`
  color: ${(props: any): string => (props.header === 'transaction' ? extractColor(props.type) : 'white')};
  font-weight: bold;
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
