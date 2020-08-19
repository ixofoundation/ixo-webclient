import * as React from 'react'
import { Hover, TooltipWrapper, TooltipInner } from './Tooltip.styles'

export enum TooltipPositions {
  Top = 'top',
  Right = 'right',
  Bottom = 'bototm',
  Left = 'left',
}

export interface ParentProps {
  text: string
  position?: TooltipPositions
}

export const Tooltip: React.SFC<ParentProps> = ({
  text,
  position,
  children,
}) => {
  return (
    <Hover>
      {children}
      <TooltipWrapper className={position}>
        <TooltipInner className={position}>
          <p>{text}</p>
        </TooltipInner>
      </TooltipWrapper>
    </Hover>
  )
}

Tooltip.defaultProps = {
  position: TooltipPositions.Top,
}
