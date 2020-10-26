import styled from 'styled-components'

export const LinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
  > div {
    width: 50% !important;
  }
  a {
    background: #ffffff;
    border-radius: 0.75rem;
    font-weight: normal;
    font-size: 0.75rem;
    line-height: 1.2;
    display: flex;
    align-items: center;
    width: calc(100% - 1rem) !important;
    padding: 0.5rem 0.75rem;
    margin: 0.5rem;
    color: #47568c;
    transition: all 0.3s;
    border: 1px solid transparent;
    cursor: pointer;
    svg {
      fill: #49BFE0;
      margin-right: 1rem;
      min-width: 0.8rem;
    }
    &:hover {
      color: #47568c;
      text-decoration: none;
      border: 1px solid ${(props: any): string => props.theme.ixoBlue};
    }
    &:focus {
      outline: none;
    }
    &.active {
      border: 1px solid ${(props: any): string => props.theme.ixoBlue};
    }
  }
`
