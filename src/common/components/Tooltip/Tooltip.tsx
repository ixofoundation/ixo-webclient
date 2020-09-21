import * as React from 'react'
import { Hover, TooltipWrapper, TooltipInner } from './Tooltip.styles'

export enum TooltipPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bototm',
  Left = 'left',
}

interface Props {
  text: string
  position?: TooltipPosition
}

const Tooltip: React.FunctionComponent<Props> = ({
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
  position: TooltipPosition.Top,
}

export default Tooltip
