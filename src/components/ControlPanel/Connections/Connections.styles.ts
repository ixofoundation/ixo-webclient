import styled from 'styled-components'
import { SquareButtonSection } from '../ControlPanel.styles'

export const ConnectionButtonsWrapper = styled(SquareButtonSection)`
  button {
    max-width: 5.5rem;
    min-width: auto;
    padding: 0.25rem;
    .icon-wrapper {
      border-radius: 50%;
      background: #f8f9fd;
      border: 1px solid #e0e5ef;
      width: 3.5rem;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin: 0 auto;
        path {
          fill: ${(props: any): string => props.theme.ixoNewBlue};
        }
      }
    }
  }
  .show-more-container {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0s ease-out;
    &.show {
      transition: max-height 1.75s ease-out;
      max-height: 300px;
    }
    > * {
      padding: 1rem;
    }
    button {
      margin: 0;
    }
  }
`
