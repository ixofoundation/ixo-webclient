import styled from 'styled-components'
import { Pagination } from 'components/Entities/EntitiesExplorer/EntitiesExplorer.container.styles'
import { TableContainer } from './PriceTable/CapitalTransactionTable.style'

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 20px;
`

export const StyledButton = styled.button`
  background: unset;
  padding: 10px 20px;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props): string => props.theme.highlight.light};
  border-radius: 4px;
  border: 1px solid ${(props): string => props.theme.highlight.light};
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
  border: ${(props): string => (props.dark ? '1px solid #0c3549' : `1px solid ${props.theme.ixoNewBlue}`)};

  & div[role='row'] {
    background: ${(props): string =>
      props.dark
        ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
        : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
    border: ${(props): string => (props.dark ? '1px solid #0c3549' : 'none')};
  }

  & div[role='cell'] {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'] span {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'][type] {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='row'] div[type='[object Object]']:last-child div {
    background: ${(props): string => (props.dark ? '' : 'rgb(233, 237, 245)')};
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & .value {
    background: ${(props): string => (props.dark ? '#143f54' : '#e9edf5')};
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }
`

export const StyledPagination = styled(Pagination)<{ dark: boolean }>`
  & a.page-link {
    color: ${(props): string => (props.dark ? '#83d9f2' : '#107591')};
  }
`
