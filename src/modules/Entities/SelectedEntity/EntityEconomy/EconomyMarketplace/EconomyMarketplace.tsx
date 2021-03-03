import React, { Component } from 'react'
import BarChart, {
  BarColors,
} from 'common/components/Widgets/BarChart/BarChart'
import IndicateArrow from 'assets/icons/IndicateArrow'

import {
  Container,
  SectionTitleContainer,
  SectionTitle,
  ActionButton,
} from '../EntityEconomy.styles'
import {
  ChartContainer,
  CardsContainer,
  LineChartCard,
  CardHeader,
  Value,
  Percent,
  Increment,
  Hours,
  LineChartWrapper,
  IncrementContainer,
} from './EconomyMarketplace.styles'
import LineChart from './components/LineChart'

const data = [
  {
    data: [100, 150, 200, 150, 180, 190],
    color: BarColors.blue,
    label: 'Data',
  },
  {
    data: [0, 100, 150, 200, 150, 180, 190],
    color: BarColors.blue,
    label: 'Data',
  },
]

const labels = [
  'User Accounts',
  'Assets Listed',
  'Cells Created',
  'Projects Started',
  'AphaBonds Issued',
  'Investments Created',
  'Templates Created',
  'Oracles Launched',
]

const labels2 = [
  'Claims Submitted',
  'Claims Evaluated',
  'Oracle Service Events',
  'All Transactions',
]

class EconomyMarketplace extends Component {
  state = {
    renderCharts: false,
  }
  componentDidMount(): void {
    this.setState({ renderCharts: true })
  }

  render(): JSX.Element {
    const { renderCharts } = this.state

    return (
      <Container>
        <ChartContainer>
          <BarChart barData={data} />
        </ChartContainer>
        <SectionTitleContainer>
          <SectionTitle>
            Market Growth in the Internet of Impact Hub
          </SectionTitle>
          <ActionButton>New Cell</ActionButton>
        </SectionTitleContainer>
        <CardsContainer>
          {labels.map((label) => {
            return (
              <LineChartCard key={label}>
                <CardHeader>
                  <div>{label}</div>
                  <i className="icon-expand" />
                </CardHeader>
                <Value>
                  {24091 + (Math.floor(Math.random() * 1000) % 1000)}
                </Value>
                <Percent>
                  <IndicateArrow fill="#85AD5C" width={11} height={10} />
                  3.8%
                </Percent>
                <LineChartWrapper>
                  {renderCharts && <LineChart />}
                </LineChartWrapper>
                <IncrementContainer>
                  <Increment>+1,322</Increment>
                  <Hours>/24hrs</Hours>
                </IncrementContainer>
              </LineChartCard>
            )
          })}
        </CardsContainer>
        <SectionTitleContainer>
          <SectionTitle>
            Transaction Activity in the internet of Impact Hub
          </SectionTitle>
        </SectionTitleContainer>
        <CardsContainer>
          {labels2.map((label) => {
            return (
              <LineChartCard key={label}>
                <CardHeader>
                  <div>{label}</div>
                  <i className="icon-expand" />
                </CardHeader>
                <Value>
                  {24091 + (Math.floor(Math.random() * 1000) % 1000)}
                </Value>
                <Percent>
                  <IndicateArrow fill="#85AD5C" width={11} height={10} />
                  3.8%
                </Percent>
                <LineChartWrapper>
                  {renderCharts && <LineChart />}
                </LineChartWrapper>
                <IncrementContainer>
                  <Increment>+1,322</Increment>
                  <Hours>/24hrs</Hours>
                </IncrementContainer>
              </LineChartCard>
            )
          })}
        </CardsContainer>
      </Container>
    )
  }
}

export default EconomyMarketplace
