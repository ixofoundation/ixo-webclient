import styled from 'styled-components'
import {
  StatisticsContainer as StatisticsContainerBase,
  StatisticLabel as StatisticLabelBase,
  StatisticValue as StatisticValueBase,
} from '../EntityCard.styles'

export const Flag = styled.img`
  position: absolute;
  right: 40px;
`
export const Logo = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  position: absolute;
  bottom: 32px;
  right: 32px;
`

export const Impact = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
  color: #a5adb0 !important;
`
export const StatisticsContainer = styled(StatisticsContainerBase)`
  justify-content: space-between;
`

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

export const Progress = styled.div`
  margin-top: 1rem;
  font-size: 36px;
  line-height: 1.2;
  font-weight: normal;
`

export const ProgressSuccessful = styled.span`
  color: black;
`

export const ProgressRequired = styled.span`
  color: grey;
`
