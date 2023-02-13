import styled from 'styled-components'

export const Message = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.25rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: ${(props): string => (props.theme === 'light' ? props.theme.ixoBlue : props.theme.highlight.light)};
  }
  .icon-pulse-wrapper {
    padding: 1rem;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    background: white;
    @keyframes iconPulse {
      0% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      border-radius: 50%;
      border: 2px solid #dfe3e8;
      opacity: 0;
      animation-delay: 1s;
      animation: iconPulse 1s ease-in-out;
      transform-origin: center;
    }
    &.repeat:after {
      animation-delay: 0;
      animation: iconPulse 1.3s infinite ease-in-out;
    }
  }

  .error {
    color: #ff1230;
  }

  .close-button,
  button {
    background: none;
    border: none;
    outline: none !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
    color: #17a2b8;
    text-decoration: none;
  }

  svg path {
    stroke: ${(props): string => (props.theme === 'light' ? props.theme.ixoBlue : props.theme.highlight.light)};
    fill: ${(props): string => (props.theme === 'light' ? props.theme.ixoBlue : props.theme.highlight.light)};
  }
`
