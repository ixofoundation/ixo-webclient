import styled from 'styled-components'

export const Bar = styled.div<{ height: number; barColor?: string; borderRadius?: string }>`
  background: ${(props): string => props.barColor ?? props.theme.ixoGrey300};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: ${({ height }): number => height}px;
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  position: relative;
  overflow: hidden;
`

export const Rejected = styled.div<{ borderRadius?: string }>`
  && {
    background: ${(props): string => props.theme.rejectedGradient};
  }
  border-radius: ${({ borderRadius }) => borderRadius || '0 10px 10px 0'};
  position: relative;
  left: -2px;
`

export const Successful = styled.div<{ barColor?: string; borderRadius?: string }>`
  && {
    background: ${({ barColor, theme }): string => (barColor ? barColor : theme.approvedGradient)};
  }
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  position: relative;
  z-index: 1;
`
export const Pending = styled.div<{ borderRadius?: string }>`
  && {
    background: ${(props): string => props.theme.highlight.light};
  }
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  position: relative;
`
export const Disputed = styled.div<{ borderRadius?: string }>`
  && {
    background: ${(props): string => props.theme.disputedGradient};
  }
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  position: relative;
`
