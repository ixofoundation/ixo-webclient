import styled from 'styled-components'

import SearchIcon from 'assets/icons/Search'

const StyledInput = styled.input`
  background: #ffffff;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  border: 1px solid hsl(0, 0%, 80%) !important;
  padding-left: 10px;
  &:focus {
    box-shadow: 0 0 0 1px #2684ff !important;
    border-color: #2684ff !important;
  }
`

const StyledInputWrapper = styled.div`
  position: relative;
  height: 100%;
`

const StyledSearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  height: 18px;

  svg > path {
    fill: ${(props): string => props.theme.highlight.light};
  }
`

export interface SearchInputProps {
  value: any
  onChange: (event: any) => void
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({ value, onChange }: SearchInputProps) => {
  return (
    <StyledInputWrapper>
      <StyledInput onChange={onChange} value={value} />
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
    </StyledInputWrapper>
  )
}

export default SearchInput
