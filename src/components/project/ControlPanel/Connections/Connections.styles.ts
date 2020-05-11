import styled from 'styled-components'
import { SquareButtonSection } from '../ControlPanel.styles'
import { QRInner } from '../../../common/QRComponent'

export const ConnectionButtonsWrapper = styled(SquareButtonSection)`
  button {
    margin-bottom: 1rem;
    .icon-wrapper {
      border-radius: 50%;
      padding: 1.25rem;
      svg {
        margin: 0 auto;
        width: 1.875rem;
        path {
          fill: ${(props): string => props.theme.ixoBlue};
        }
      }
    }
  }
  .show-more-container {
    background: #fff;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    > * {
      padding: 1rem;
    }
    button {
      margin: 0;
    }
    ${QRInner} {
      background: none;
      box-shadow: none;
      margin: 0;
      padding: 0;
      height: initial;
    }
  }
`
