import styled from 'styled-components'
import { Pagination } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.styles'
import { TableContainer } from './PriceTable/index.style'

export const TransactionTableWrapper = styled.div``

export const TransactionTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const TransactionTableTitle = styled.div`
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;

  color: #ffffff;
`

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 20px;
`

export const StyledButton = styled.button`
  background: unset;
  padding: 10px 20px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #39c3e6;
  border-radius: 4px;
  border: 1px solid #39c3e6;
  cursor: pointer;

  &.disable {
    opacity: 0.5;
    pointer-events: none;
  }
`

export const TransactionTableBody = styled.div``

export const StyledTableContainer = styled(TableContainer)<{ dark: boolean }>`
  background: ${(props): string =>
    props.dark
      ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
      : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
  border: ${(props): string =>
    props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};

  & div[role='row'] {
    background: ${(props): string =>
      props.dark
        ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
        : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
    border: ${(props): string =>
      props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};
  }

  & div[role='cell'] span {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'][type] {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'] div div {
    color: white;
  }

  & div[role='row'] div[type='[object Object]']:last-child div {
    background: ${(props): string => (props.dark ? '' : 'rgb(233, 237, 245)')};
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }
`

export const StyledPagination = styled(Pagination)<{ dark: boolean }>`
  & a.page-link {
    color: ${(props): string => (props.dark ? '#83d9f2' : '#107591')};
  }
`
