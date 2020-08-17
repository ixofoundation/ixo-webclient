import styled from 'styled-components'

export const BondsSectionNav = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  a {
    font-weight: normal;
    font-size: 1.1875rem;
    text-transform: uppercase;
    text-decoration: none;

    color: #ffffff;
    padding: 0.25rem 1.5rem;
    &.active {
      color: #87def6;
    }
    &:hover {
      text-decoration: none;
      color: #87def6;
    }
  }
`
