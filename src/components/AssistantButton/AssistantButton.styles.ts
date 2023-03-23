import styled from 'styled-components'

export const StyledAssistantButton = styled.button`
  background: ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  position: relative;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
