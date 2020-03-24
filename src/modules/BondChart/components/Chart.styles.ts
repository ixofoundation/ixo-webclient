import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const ChartContainer = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    display: none;
  }
`
