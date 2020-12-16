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
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
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
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  a {
    color: #143F54 !important;
    &.active {
      border: 1px solid #39C3E6;
    }
  }
`

export const SearchBar = styled(SearchBarInput)`
  width: 22rem;
  margin-left: 3.5rem;
  input {
    background: #fff;
    color: #143F54;
    :focus {
      outline-color: #143F54;
      outline-style: auto;
    }

    ::placeholder {
      color: #143F54;
    }
  }

  svg {
    path {
      fill: #9EA5B4 !important;
    }
  }

`

export const Divider = styled.hr`
  width: 100%;
  border-color: #D5D9E0;
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
  background: #F0F3F9 !important;
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

  &.active {
    border: 1px solid #39C3E6;
  }
`

export const TitleWrapper = styled.div`
  min-width: 11rem;
`