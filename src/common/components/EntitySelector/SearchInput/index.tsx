import * as React from 'react';
import styled from 'styled-components'

import SearchIcon from 'assets/icons/Search'

const StyledInput = styled.input`
  background: #FFFFFF;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  border: 1px solid hsl(0,0%,80%) !important;
  &:focus {
    box-shadow: 0 0 0 1px #2684FF !important;
    border-color: #2684FF !important;
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
`

export interface SearchInputProps {
  onChange: any
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({ onChange }: SearchInputProps) => {
  return (
    <StyledInputWrapper>
      <StyledInput onChange={onChange} />
      <StyledSearchIconWrapper>
        <SearchIcon fill="#39C3E6" />
      </StyledSearchIconWrapper>
    </StyledInputWrapper>
  );
}

export default SearchInput
