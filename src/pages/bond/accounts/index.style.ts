import styled from 'styled-components'

export const BondsHomeSectionNav = styled.div`
  padding: 1rem;
  margin-left: 1.875rem;
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
  @media (max-width: 768px) {
    padding: 1rem 0;
    margin: 0;
    width: initial;
    overflow-x: scroll;
  }
`

export const NoAssets = styled.div`
  width: 300px;
  height: 200px;
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  border: 1px solid #00D2FF;
  padding: 50px 20px;

  font-family: Roboto;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.3px;
  color: #FFFFFF;
  cursor: pointer;
`