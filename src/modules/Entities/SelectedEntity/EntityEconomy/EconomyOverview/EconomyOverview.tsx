import React, { Component } from 'react'
import IndicateArrow from 'assets/icons/IndicateArrow'
import {
  Container,
  FigureCardsContainer,
  FigureCard,
  FigureLabel,
  FigureContainer,
  Figure,
  FigurePercent,
  FigureSubtle,
  ChartContainer,
} from './EconomyOverview.styles'

import {
  SectionTitleContainer,
  ButtonWrapper,
  SectionTitle,
} from '../EntityEconomy.styles'

import Chart from './components/Chart/Chart'
import Table from './components/Table'

const tableData = [
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: false,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
  {
    date: Date.now(),
    buySell: true,
    quantity: 28,
    price: 12,
    value: 86,
  },
]

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Buy/Sell',
    accessor: 'buySell',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Value',
    accessor: 'value',
  },
]

class EconomyOverview extends Component {
  render(): JSX.Element {
    return (
      <Container>
        <FigureCardsContainer>
          <FigureCard>
            <FigureLabel>Token Price</FigureLabel>
            <FigureContainer>
              <Figure>€ 2.30</Figure>
              <IndicateArrow fill="#85AD5C" width={11} height={10} />
              <FigurePercent>2.8%</FigurePercent>
            </FigureContainer>
            <FigureSubtle>$ 2.56</FigureSubtle>
          </FigureCard>
          <FigureCard>
            <FigureLabel>Token Supply</FigureLabel>
            <FigureContainer>
              <Figure>32’345’132</Figure>
              <IndicateArrow fill="#85AD5C" width={11} height={10} />
              <FigurePercent>2.8%</FigurePercent>
            </FigureContainer>
            <FigureSubtle>7.5% Annual Inflation</FigureSubtle>
          </FigureCard>
          <FigureCard>
            <FigureLabel>Tokens Staked</FigureLabel>
            <FigureContainer>
              <Figure>440’000</Figure>
              <IndicateArrow fill="#85AD5C" width={11} height={10} />
              <FigurePercent>2.8%</FigurePercent>
            </FigureContainer>
            <FigureSubtle>Bonded in Proof of Stake</FigureSubtle>
          </FigureCard>
          <FigureCard>
            <FigureLabel>Token Yield</FigureLabel>
            <FigureContainer>
              <Figure>3.2%</Figure>
              <IndicateArrow fill="#85AD5C" width={11} height={10} />
              <FigurePercent>2.8%</FigurePercent>
            </FigureContainer>
            <FigureSubtle>Moving Avge 12 months</FigureSubtle>
          </FigureCard>
          <FigureCard>
            <FigureLabel>Token Holders</FigureLabel>
            <FigureContainer>
              <Figure>1,230</Figure>
              <IndicateArrow fill="#85AD5C" width={11} height={10} />
              <FigurePercent>2.8%</FigurePercent>
            </FigureContainer>
            <FigureSubtle>Unique Accounts</FigureSubtle>
          </FigureCard>
        </FigureCardsContainer>
        <ChartContainer>
          <Chart data={null} />
        </ChartContainer>
        <SectionTitleContainer>
          <SectionTitle>IXO Token Transactions</SectionTitle>
          <ButtonWrapper>
            <button>Buy</button>
            <button>Swap</button>
          </ButtonWrapper>
        </SectionTitleContainer>
        <Table columns={columns} data={tableData} />
      </Container>
    )
  }
}

export default EconomyOverview
