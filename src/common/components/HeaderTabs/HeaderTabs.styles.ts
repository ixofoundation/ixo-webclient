import { deviceWidth } from '../../../lib/commonData'
import styled from 'styled-components'

export const PositionController = styled.div`
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 3.5rem;
  transform: translateX(-50%);
  @media (min-width: ${deviceWidth.desktop}px) {
    left: initial;
    right: 190px;
    transform: none;
  }
`
