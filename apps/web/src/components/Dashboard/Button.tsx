import styled from 'styled-components'

const Button = styled.button`
  color: ${({ theme }): string => (theme.theme === 'light' ? '#373d3f' : theme.highlight.light)};
  min-width: 85px;
  height: 42px;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border: 1.5px solid ${(props): string => props.theme.highlight.light};
  background: transparent;
  border-radius: 5px;
`

export default Button
