import styled from 'styled-components'

export const ConnectButton = styled.div<{ disabled?: boolean }>`
  border: 1px solid currentColor;
  border-radius: 8px;

  width: 100px;
  height: 36px;

  background: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;

  ${(props) => props.disabled && `pointer-events: none;`}
`
