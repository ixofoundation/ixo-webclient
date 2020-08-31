import styled from 'styled-components'
import {
  MainContent as MainContentBase,
  Title as TitleBase,
  Founded as FoundedBase,
  FoundedDate as FoundedDateBase,
  StatisticsContainer as StatisticsContainerBase,
  Statistic as StatisticBase,
  StatisticLabel as StatisticLabelBase,
  StatisticValue as StatisticValueBase,
} from '../EntityCard.styles'

export const MainContent = styled(MainContentBase)``
export const Title = styled(TitleBase)`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #000;
`
export const Founded = styled(FoundedBase)`
  color: #000 !important;
  line-height: 1.5;
`
export const FoundedDate = styled(FoundedDateBase)``
export const StatisticsContainer = styled(StatisticsContainerBase)``
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
