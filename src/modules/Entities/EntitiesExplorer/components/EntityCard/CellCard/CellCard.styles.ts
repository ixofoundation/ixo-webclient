import styled from 'styled-components'
import {
  Title as TitleBase,
  Statistic as StatisticBase,
  StatisticLabel as StatisticLabelBase,
  StatisticValue as StatisticValueBase,
} from '../EntityCard.styles'

// TODO - use first bottom style when stats available
export const Logo = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  position: absolute;
  right: 32px;
  bottom: 170px;
  // bottom: 118px;
`

export const Title = styled(TitleBase)`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #000;
`

export const FoundedDate = styled.span`
  font-weight: bold;
`

export const Founded = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  color: #000 !important;
  line-height: 1.5;
`

export const Statistic = styled(StatisticBase)`
  flex: 0.5;
  font-size: 24px;
  display: flex;
  flex-flow: row nowrap;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`
export const StatisticLabel = styled(StatisticLabelBase)`
  font-weight: 400;
`

export const StatisticValue = styled(StatisticValueBase)`
  margin-right: 0.5rem;
  font-weight: bold;
`
