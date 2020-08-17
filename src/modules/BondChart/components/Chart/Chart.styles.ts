import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ChartContainer = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    width: 100%;
  }
`

export const StyledHeader = styled.h2`
  color: white;
  margin-top: 2em;
`
