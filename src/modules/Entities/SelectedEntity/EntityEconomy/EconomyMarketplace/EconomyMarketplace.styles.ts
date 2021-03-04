import styled from 'styled-components'

export const ChartContainer = styled.div`
  background: white;
  padding: 20px 28px;
  border-radius: 4px;
`

export const LineChartCard = styled.div`
  background: linear-gradient(180deg, #FFFFFF 0%, #F2F5FB 100%);
  box-shadow: 0px 4px 25px #E1E5EC;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 20%;
  height: 320px;
  padding: 24px;
  margin: 12px;
  flex-grow: 1;
  flex-basis: 0;
`

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`

export const Value = styled.div`
  font-weight: normal;
  font-size: 36px;
  color: #373D3F;
`

export const Percent = styled.div`
  color: #85AD5C;
  font-size: 20px;
  font-weight: bold;
  color: #85AD5C;
`

export const Increment = styled.span`
font-size: 21px;color: #373D3F;
font-weight: normal;
`

export const Hours = styled.span`
  font-weight: 300;
  font-size: 12px;
  color: #373D3F;
`

export const LineChartWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`

export const IncrementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ChartHeader = styled.div`
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  color: #01283B;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
`
export const Bullet = styled.div`
  background: #D9DEE9;
  width: 10px;
  height: 10px;
  margin-right: 10px;
`

export const Color = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 11px;
  color: #01283B;
  line-height: 13px;
`