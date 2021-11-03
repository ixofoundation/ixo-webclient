import styled from 'styled-components'

const Button = styled.button`
  color: ${({ theme }): string =>
    theme === 'light' ? '#373d3f' : '#39C3E6'};
  min-width: 85px;
  height: 42px;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border: 1.5px solid #49bfe0;
  background: transparent;
  border-radius: 5px;
`

export default Button
