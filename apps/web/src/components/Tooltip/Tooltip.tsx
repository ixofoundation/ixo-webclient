import { Typography } from 'components/Typography'
import { Hover, TooltipWrapper, TooltipInner, AfterClick } from './Tooltip.styles'
import { ReactNode } from 'react'

export enum TooltipPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

interface Props {
  text: string | JSX.Element
  width?: string
  position?: TooltipPosition
  afterClick?: boolean
  clicked?: boolean
  children?: ReactNode
}

const Tooltip: React.FunctionComponent<Props> = ({
  text,
  width = '9.5rem',
  position,
  afterClick = false,
  clicked = false,
  children,
}): JSX.Element => {
  if (!text) {
    return <>{children}</>
  }
  return !afterClick ? (
    <Hover>
      {children}
      <TooltipWrapper className={position} width={width}>
        <TooltipInner className={position}>
          <Typography size='md' color='black'>
            {text}
          </Typography>
        </TooltipInner>
      </TooltipWrapper>
    </Hover>
  ) : (
    <AfterClick clicked={clicked}>
      {children}
      <TooltipWrapper className={position} width={width}>
        <TooltipInner className={position}>
          <Typography size='md' color='black'>
            {text}
          </Typography>
        </TooltipInner>
      </TooltipWrapper>
    </AfterClick>
  )
}

Tooltip.defaultProps = {
  position: TooltipPosition.Top,
}

export default Tooltip
