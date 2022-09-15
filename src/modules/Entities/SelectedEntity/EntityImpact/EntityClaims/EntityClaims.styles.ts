import styled from 'styled-components'
import SearchBarInput from 'common/components/SearchBar/SearchBar'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'

export const SectionTitle = styled.div`
  font-size: 1.375rem;
  margin-bottom: 0.4rem;
  color: black;
`

export const AmountCard = styled.div`
  width: 13.5rem;
  height: 6.25rem;
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  border-radius: 0.25rem;
`

export const AmountCardsContainer = styled.div`
  display: flex;

  > div {
    margin-right: 0.5rem;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  gap: 10px;
  flex-wrap: wrap;

  a {
    color: #143f54 !important;
    font-size: 10px;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0;

    &.active {
      border: 1px solid ${(props): string => props.theme.highlight.light};
    }
  }
`

export const SearchBar = styled(SearchBarInput)`
  width: 22rem;
  margin-left: 3.5rem;
  input {
    width: 100%;
    height: 40px;
    background: #fff;
    color: #143f54;
    :focus {
      outline-color: #143f54;
      outline-style: auto;
    }

    ::placeholder {
      color: #143f54;
    }
  }

  svg {
    path {
      fill: #9ea5b4 !important;
    }
  }
`

export const Divider = styled.hr`
  width: 100%;
  border-color: #d5d9e0;
  margin-bottom: 1.625rem;
  margin-top: 0;
`

export const ClaimsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;
`

export const Layout = styled(LayoutWrapper)`
  background: #f0f3f9 !important;
  font-weight: 400;
`

export const HeaderButton = styled.button`
  outline: none !important;
  font-size: 1rem;
  color: black;
  font-weight: 500;
  height: 2.5rem;
  width: 6.5rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props): string => props.theme.ixoBlue};
  }
  &.active {
    border: 1px solid ${(props): string => props.theme.ixoBlue};
    color: ${(props): string => props.theme.ixoBlue};
  }
`

export const TitleWrapper = styled.div`
  min-width: 11rem;
`
