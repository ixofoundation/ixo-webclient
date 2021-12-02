import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`

export const Container = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    width: 100%;
  }

  svg {
    width: 100% !important;
  }

  .apexcharts-canvas {
    width: 100% !important;
  }
`
