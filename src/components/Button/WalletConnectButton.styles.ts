import styled from 'styled-components'

export const ConnectButton = styled.div`
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  border-radius: 8px;

  width: 100px;
  height: 36px;

  background: none;
  color: ${(props) => props.theme.ixoWhite};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;
`
