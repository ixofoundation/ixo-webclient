import styled from 'styled-components'

import { deviceWidth } from 'lib/commonData'

export const MapWrapper = styled.div`
  position: relative;

  :hover {
    cursor: grab;
  }

  :active {
    cursor: grabbing;
  }

  path:focus {
    outline: none !important;
  }
  g.rsm-marker {
    outline-width: 0px;
  }
`

export const MobileSwipeIconWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 1px;
  padding: 0;
  margin: 0;

  @media (min-width: ${deviceWidth.mobile}px) {
    display: none;
  }
`
