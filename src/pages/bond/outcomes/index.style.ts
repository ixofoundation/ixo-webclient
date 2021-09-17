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

export const Container = styled.div`
  // padding: 20px 40px;
  // background: #E5E5E5;
  font-family: Roboto Condensed;
  font-weight: normal;
  padding-bottom: 100px;
`

export const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0px;
`

export const SectionTitle = styled.div`
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: normal;
  font-size: 45px;
  line-height: 41px;
  color: #FFFFFF;
`