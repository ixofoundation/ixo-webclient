import styled from 'styled-components'
import SearchBarInput from 'common/components/SearchBar/SearchBar'

export const SectionTitle = styled.div`
  font-size: 1.375rem;
  margin-bottom: 0.4rem;
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
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

export const SearchBar = styled(SearchBarInput)`
  width: 12rem;
  margin-left: 3.5rem;
`

export const Divider = styled.hr`
  width: 100%;
  border-color: #143F54;
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