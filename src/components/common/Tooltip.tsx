import * as React from 'react'
import styled from 'styled-components'

export enum TooltipPositions {
  top = 'TOP',
  right = 'RIGHT',
  bottom = 'BOTTOM',
  left = 'LEFT',
}

export interface ParentProps {
  text: string
  icon?: boolean
  position?: TooltipPositions
}

export const Tooltip: React.SFC<ParentProps> = ({
  text,
  icon,
  position,
  children,
}) => {
  let positionCss = ''
  let arrowCss = ''
  let transformOrigin = ''
  switch (position) {
    case TooltipPositions.top:
    default:
      positionCss = `
        bottom: calc(100% + 15px);
        left: 50%;
        transform: translateX(-50%);
			`
      arrowCss = `
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-top: 10px solid white;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
			`
      transformOrigin = 'bottom left'
      break
    case TooltipPositions.right:
      positionCss = `
				top: -10px;
				left: calc(100% + 15px);
			`
      arrowCss = `
					border-right: 10px solid white;
					border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          left: -10px;
					top: 10px;
			`
      transformOrigin = 'top left'
      break
    case TooltipPositions.bottom:
      positionCss = `
				top: calc(100% + 15px);
				left: 50%;
        transform: translateX(-50%);
			`
      arrowCss = `
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-bottom: 10px solid white;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
			`
      transformOrigin = 'top left'
      break
    case TooltipPositions.left:
      positionCss = `
				right: calc(100% + 15px);
				top: -10px;
				display: flex;
				justify-content: flex-end;
			`
      arrowCss = `
					border-top: 10px solid transparent;
					border-left: 10px solid white;
					border-bottom: 10px solid transparent;
          top: 10px;
          right: -10px;
			`
      transformOrigin = 'top right'
      break
  }

  const TooltipWrapper = styled.div`
    position: absolute;
    width: 9.5rem;
    z-index: 1;
    pointer-events: none;
    ${positionCss}
  `

  const TooltipInner = styled.div`
    opacity: 0;
    transform: scale(0.8);
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    pointer-events: none;

    p {
      color: black;
      margin: 0;
      font-size: 0.75rem;
    }

    :after {
      content: '';
      position: absolute;
      ${arrowCss}
    }

    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: ${transformOrigin};
  `

  const Hover = styled.div`
    position: relative;
    ${icon && icon === true && 'width: 20px;height:20px;'}

    > i {
      font-size: 20px;

      > :before {
        color: grey;
      }
    }

    :hover {
      ${TooltipInner} {
        opacity: 1;
        transform: scale(1);
      }
    }
  `

  return (
    <Hover>
      {icon && icon === true ? <i className="icon-pending" /> : children}
      <TooltipWrapper>
        <TooltipInner>
          <p>{text}</p>
        </TooltipInner>
      </TooltipWrapper>
    </Hover>
  )
}
