import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const SidebarWrapper = styled.div`
  background: #dfe7f4;
`

export const MainPanelWrapper = styled.div`
  &&& {
    @media (min-width: 992px) {
      padding-left: 8rem;
    }
  }
`

export const OverviewContainer = styled.section`
  background: white;
  color: black;
  padding-bottom: 40px;
  line-height: 2;
  hr {
    border: 1px solid #e8edee;
    width: 7.5rem;
    margin: 3.75rem auto;
    border-radius: 2px;
  }
  img {
    max-width: 100%;
  }
  h2 {
    margin: 2rem 0;
  }
  h3 {
    font-size: 1.375rem;
    font-weight: bold;
    font-family: ${(props: any): string => props.theme.fontRoboto};
    margin: 0.75rem 0;
  }
  .content-section {
    > p:first-of-type::first-letter {
      float: left;
      background: #e8edee;
      padding: 0.5rem 1.125rem;
      border-radius: 4px;
      font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
      font-weight: normal;
      font-size: 2.8125rem;
      line-height: 1;
      margin-right: 0.5rem;
    }
  }
  .content-section ~ .content-section {
    background: none;
    p {
      color: inherit;
      line-height: inherit;
      &::first-letter {
        background: none;
        padding: 0;
        border-radius: none;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        margin-right: 0;
      }
    }
  }
  .content-section {
    .table-wrapper {
      overflow-x: scroll;
      table.table {
        width: max-content;
        max-width: none;
      }
    }
    table.table thead th,
    table.table td {
      border: none;
    }
    table.table thead th {
      font-weight: normal;
      color: #93979d;
      font-size: 0.75rem;
    }
    table.table td {
      font-weight: bold;
      font-size: 0.875rem;
      letter-spacing: 0.3px;
      color: #000000;
    }
  }
`

export const ProfileCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1.75rem -1.75rem 0;
`

export const InlineImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  img,
  p {
    flex: 1 1 auto;
    width: 100%;
  }
  img {
    height: intrinsic;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  p {
    :last-child {
      margin-bottom: 0;
    }
  }
  p.caption {
    font-size: 0.75rem;
    line-height: 2;
    margin-top: 1rem;
    color: #a5adb0;
    margin-left: 0;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    img {
      width: 50%;
      margin-bottom: 0;
    }
    p {
      width: calc(50% - 1.35rem);
      margin-left: 1.25rem;
    }
  }
`
