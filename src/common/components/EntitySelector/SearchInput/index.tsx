import * as React from 'react';
import styled from 'styled-components'

import SearchIcon from 'assets/icons/Search'

const StyledInput = styled.input`
  background: #FFFFFF;
  /* shadow / searchbar */

  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  height: 100%;
  width: 100%;
`

const StyledInputWrapper = styled.div`
  position: relative;
  height: 100%;
`

const StyledSearchIconWrapper = styled.div`
  position: absolute;
  top: 0.7rem;
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
