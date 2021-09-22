import styled from 'styled-components'

export const LinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  > div {
    width: 50% !important;
    padding: 0.25rem;
  }
  a {
    word-break: break-word;
    background: #F8F9FD;
    border-radius: 0.25rem;
    border: 1px solid #E0E5EF;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    color: #122045;
    transition: all 0.3s;
    cursor: pointer;
    min-height: 2.5rem;
    svg {
      fill: #49BFE0;
      margin-right: 0.5rem;
      min-width: 0.8rem;
    }
    &:hover {
      border-color: #00D2FF;
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
    &.active {
      border-color: #00D2FF;
    }
  }
`