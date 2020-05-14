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
`

export const Founded = styled.p`
  font-size: 12px;
  margin-bottom: 0;
`

export const FoundedDate = styled.span`
  font-weight: bold;
`

export const StatisticsContainer = styled.div`
  display: flex;
  margin-bottom: 26px;
`

export const Statistic = styled.div`
  flex: 0.5;
  font-size: 24px;
`

export const StatisticLabel = styled.span`
  color: grey;
`

export const StatisticValue = styled.span`
  color: #000;
  font-weight: bold;
`
