import styled from 'styled-components'

export const TooltipWrapper = styled.div`
  position: absolute;
  width: 9.5rem;
  z-index: 1;
  pointer-events: none;

  &.top {
    bottom: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  }

  &.right {
    top: -10px;
    left: calc(100% + 15px);
  }

  &.bottom {
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  }

  &.left {
    right: calc(100% + 15px);
    top: -10px;
    display: flex;
    justify-content: flex-end;
  }
`

export const TooltipInner = styled.div`
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

  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &.top {
    transform-origin: bottom left;
  }

  &.right {
    transform-origin: top left;
  }

  &.bottom {
    transform-origin: top left;
  }

  &.left {
    transform-origin: top right;
  }

  :after {
    content: '';
    position: absolute;
  }

  &.top:after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.right:after {
    border-right: 10px solid white;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    left: -10px;
    top: 10px;
  }

  &.bottom:after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.left:after {
    border-top: 10px solid transparent;
    border-left: 10px solid white;
    border-bottom: 10px solid transparent;
    top: 10px;
    right: -10px;
  }
`

export const Hover = styled.div`
  position: relative;

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

export const AfterClick = styled.div<{ clicked: boolean }>`
  position: relative;

  > i {
    font-size: 20px;

    > :before {
      color: grey;
    }
  }

  :hover {
    ${TooltipInner} {
      opacity: ${(props: any): any => (props.clicked === true ? '1' : '0')};
      transform: scale(1);
    }
  }
`
