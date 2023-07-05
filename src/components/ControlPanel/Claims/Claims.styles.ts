import styled from 'styled-components'

export const LinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;

  .pe-none {
    pointer-events: none;
  }

  > div {
    width: 50% !important;
    padding: 0.25rem;
  }
  a {
    word-break: break-word;
    background: #f8f9fd;
    border-radius: 0.25rem;
    border: 1px solid #e0e5ef;
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
      margin-right: 0.5rem;
      min-width: 0.8rem;
      path {
        fill: ${(props): string => props.theme.ixoNewBlue};
      }
    }
    &:hover {
      border-color: ${(props): string => props.theme.ixoNewBlue};
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
    &.active {
      border-color: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`
