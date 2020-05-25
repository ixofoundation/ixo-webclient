import { deviceWidth } from '../../../lib/commonData'
import styled from 'styled-components'

export const PositionController = styled.div`
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 3.5rem;
  transform: translateX(-50%);
  @media (min-width: ${deviceWidth.tablet}px) {
    width: calc(
      156px * 3
    ); /* as per Shaun's request to make the buttons 156px */
    left: initial;
    right: 190px;
    transform: none;
  }
`
