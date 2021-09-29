import styled from 'styled-components'
import { animated } from 'react-spring'
import { ThemeContext } from './Dashboard'

interface StyledTableCellProps {
  header: string
  type: boolean
}

export const TableContainer = styled.div<{ theme: ThemeContext }>`
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f3f6fc 97.29%)'};

  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0px 2px 10px rgba(0, 0, 0, 0.180339)'
      : '0px 4px 25px #e1e5ec'};
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

    th {
      color: ${({ theme }) => (theme.isDark ? '#688EA0' : '#373d3f')};
    }

    td {
      color: ${({ theme }) => (theme.isDark ? '#fff' : '#373d3f')};
    }
    tbody {
      tr {
        background: ${({ theme }) => (theme.isDark ? '#023044' : '#f7f9fd')};
      }
    }
  }
`

export const StyledTableHeader = styled.th`
  text-transform: uppercase;
  text-align: ${(props: any): string => props.align ?? 'center'};
  &:first-child {
    padding-left: 2em;
  }
`

export const StyledTableCell = styled.td<StyledTableCellProps>`
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

export const NavLink = styled.a`
  color: white;

  &:hover {
    color: white;
  }
`

export const ValidatorLogo = styled.img`
  width: 40px;
  border-radius: 50px;
`
