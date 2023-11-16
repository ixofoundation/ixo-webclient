import styled from 'styled-components'

export const TypeButton = styled.div`
  width: 140px;
  height: 48px;
  padding: 5px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  text-align: center;

  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: ${(props): string => props.theme.ixoWhite};
  transition: all 0.2s;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
    color: ${(props): string => props.theme.ixoWhite};
  }
`
