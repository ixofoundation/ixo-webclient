import styled from 'styled-components'
import {
  MainContent as MainContentBase,
  Title as TitleBase,
  Progress as ProgressBase,
  ProgressSuccessful as ProgressSuccessfulBase,
  ProgressRequired as ProgressRequiredBase,
  Impact as ImpactBase,
  StatisticsContainer as StatisticsContainerBase,
  Statistic as StatisticBase,
  StatisticLabel as StatisticLabelBase,
  StatisticValue as StatisticValueBase,
} from '../EntityCard.styles'

export const MainContent = styled(MainContentBase)``
export const Title = styled(TitleBase)``
export const Progress = styled(ProgressBase)``
export const ProgressSuccessful = styled(ProgressSuccessfulBase)``
export const ProgressRequired = styled(ProgressRequiredBase)``
export const Impact = styled(ImpactBase)`
  color: #a5adb0 !important;
`
export const StatisticsContainer = styled(StatisticsContainerBase)`
  justify-content: space-between;
`
export const Statistic = styled(StatisticBase)``
export const StatisticLabel = styled(StatisticLabelBase)`
  display: block;
  font-weight: 400;
  font-size: 12px;
  color: #a5adb0;
`
export const StatisticValue = styled(StatisticValueBase)`
  display: block;
  font-weight: normal;
  font-size: 36px;
  line-height: 36px;
`
