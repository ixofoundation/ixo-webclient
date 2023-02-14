import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import Search from 'assets/icons/Search'

const SearchInput = styled.input`
  background: #023044;
  border-radius: 4px;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  font-size: 0.75rem;
  color: ${/* eslint-disable-line */ (props) => props.theme.ixoLightBlue};
  border: none;
  height: 1.75rem;

  :focus {
    outline-color: ${/* eslint-disable-line */ (props) => props.theme.ixoLightBlue};
    outline-style: solid;
  }
  ::placeholder {
    color: ${/* eslint-disable-line */ (props) => props.theme.ixoLightBlue};
  }
`

const SearchIcon = styled(Search)`
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
`

const SearchBar: React.FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <div className={className + ' position-relative'} {...props}>
      <SearchInput {...props} />
      <SearchIcon fill='#39C3E6' width={14} />
    </div>
  )
}

export default SearchBar
