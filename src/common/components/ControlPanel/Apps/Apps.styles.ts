import styled from 'styled-components'
import { SquareButtonSection } from '../ControlPanel.styles'

export const AppButtonsWrapper = styled(SquareButtonSection)`
  button {
    .icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.hide {
      display: none;
    }
  }
`
