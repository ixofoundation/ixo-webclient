import styled from 'styled-components'

export const ColorCode = styled.div<{ backgroundColor: string; height?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#0C3549'};
  height: ${({ height }) => height || '50%'};
  width: 10px;
  position: absolute;
  left: -5px;
  border-radius: 5px;
  top: 0;
  bottom: 0;
  margin: auto 0;
`
