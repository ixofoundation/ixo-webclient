import styled from 'styled-components'

export const LoaderContainer = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Pulse = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.ixoNewBlue};
  position: absolute;
  margin: 0;
  padding: 1px;

  @keyframes spinPulse {
    0% {
      width: 40px;
      height: 40px;
      background: ${(props): string => props.theme.ixoNewBlue};
    }
    100% {
      width: 80px;
      height: 80px;
      background: rgba(0, 34, 51, 0);
    }
  }
  animation: spinPulse 1.5s infinite ease;
`
