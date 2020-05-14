import styled from 'styled-components'

export const MainContent = styled.div`
  margin: 30px 0 26px;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 21px;
  box-sizing: border-box;
  margin-bottom: 2px;
  color: ${/* eslint-disable-line */ props => props.theme.fontDarkGrey};
  line-height: 1.2;
  height: 28px;
`

export const Progress = styled.div`
  margin-top: 16px;
`

export const ProgressSuccessful = styled.span`
  font-size: 36px;
  color: black;
`

export const ProgressRequired = styled.span`
  font-size: 36px;
  color: grey;
`

export const Impact = styled.p`
  font-size: 12px;
  font-weight: 400;
`

export const StatisticsContainer = styled.div`
  display: flex;
  margin-bottom: 26px;
`

export const Statistic = styled.div`
  flex: 0.33;
`

export const StatisticLabel = styled.div`
  color: grey;
  font-size: 12px;
`

export const StatisticValue = styled.div`
  color: #000;
  font-weight: normal;
  font-size: 36px;
  line-height: 36px;
`
