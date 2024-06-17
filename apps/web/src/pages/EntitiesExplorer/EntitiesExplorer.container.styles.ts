import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
`

export const EntitiesContainer = styled.div`
  background: white;
  flex: 1 1 auto;
  min-height: 480px;

  & > .row {
    margin-top: 30px;
    justify-content: center;
  }

  > .container {
    padding: 2rem 0 3.125rem;
    @media (min-width: ${deviceWidth.tablet}px) {
      padding: 4.5rem 0 3.125rem;
    }
  }
`

export const EntitiesBody = styled.div`
  min-height: 500px;

  .infinite-scroll-component {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: white;
  align-items: center;
  background-color: ${/* eslint-disable-line */ (props) => props.theme.ixoDarkestBlue};
  height: 100%;
  min-height: 480px;
`

export const NoEntitiesContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: black;
  align-items: center;
  min-height: 480px;
`

export const Pagination = styled.div`
  .pagination {
  }
  .page-item {
    &.disabled > .page-link {
      background-color: transparent;
      color: #87def6;
      border: 1px solid #b3deeb;
    }
    &.active > .page-link {
      border-color: #b3deeb;
      background-color: #b3deeb;

      &:focus {
        box-shadow: none;
      }
    }
    &:first-child > .page-link {
      border-radius: 4px 0px 0px 4px;
      width: auto;
      padding-left: 30px;
      padding-right: 30px;

      @media (max-width: ${deviceWidth.mobile}px) {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    &:last-child > .page-link {
      border-radius: 0px 4px 4px 0px;
      border-right: 1px solid #b3deeb;
      width: auto;
      padding-left: 30px;
      padding-right: 30px;

      @media (max-width: ${deviceWidth.mobile}px) {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
  .page-link {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: 500;
    font-size: 18px;
    line-height: 100%;
    color: #83d9f2;
    background-color: transparent;
    border: unset;
    padding: 10px;
    box-shadow: none;
    border: 1px solid #b3deeb;
    border-right: 1px solid transparent;
    width: 65px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${deviceWidth.tablet}px) {
      width: 40px;
      font-size: 14px;
      padding: 5px;
    }

    &:hover {
      background-color: #e5e5e5;
      border-right: 1px solid #b3deeb;
    }
  }
`
