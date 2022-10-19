import styled from 'styled-components'

const calcWidth = (size: 'big' | 'medium' | 'small'): string => {
  switch (size) {
    case 'big':
      return '200px'
    case 'medium':
      return '140px'
    case 'small':
      return '100px'
    default:
      return 'auto'
  }
}

const calcHeight = (size: 'big' | 'medium' | 'small'): string => {
  switch (size) {
    case 'big':
      return '80px'
    case 'medium':
      return '40px'
    case 'small':
      return '20px'
    default:
      return 'auto'
  }
}

export const StyledButton = styled.button<{
  active?: boolean
  size?: 'big' | 'medium' | 'small'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  color: white;
  background: ${(props): string =>
    props.active ? props.theme.ixoNewBlue : props.theme.color1};
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  width: ${(props): string => calcWidth(props.size)};
  height: ${(props): string => calcHeight(props.size)};

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
  }
`
