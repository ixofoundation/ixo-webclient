import React from 'react'
import GaugeChart from 'react-gauge-chart'

import { GaugeChartContainer } from './EconomyCarbon.styles'
import CarbonPriceChart from './components/CarbonPriceChart'
import CarbonTable from './components/CarbonTable'
import { Container, Card, CardTitle, SectionTitleContainer, SectionTitle } from '../EntityEconomy.styles'

const columns = [
  {
    Header: 'RELAYER',
    accessor: 'relayer',
    width: '100px',
  },
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'CARBON CLAIM',
    accessor: 'ixoStaked',
  },
  {
    Header: 'CARBON OFFSET',
    accessor: 'votingPower',
  },
  {
    Header: 'CARBON SLASH',
    accessor: 'commission',
  },
  {
    Header: 'CARBON BALANCE',
    accessor: 'yieldPerIxo',
  },
]

const tableData = [
  {
    relayer: 1,
    name: 'Relayer Name',
    ixoStaked: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    yieldPerIxo: '13.3%',
  },
  {
    relayer: 1,
    name: 'Relayer Name',
    ixoStaked: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    yieldPerIxo: '13.3%',
  },
  {
    relayer: 1,
    name: 'Relayer Name',
    ixoStaked: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    yieldPerIxo: '13.3%',
  },
  {
    relayer: 1,
    name: 'Relayer Name',
    ixoStaked: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    yieldPerIxo: '13.3%',
  },
]

const EconomyCarbon: React.FunctionComponent = () => {
  return (
    <Container>
      <div className='d-flex'>
        <GaugeChartContainer>
          <Card>
            <CardTitle>Impact Hub Carbon Balance (30 Day Average)</CardTitle>
            <GaugeChart
              style={{
                width: '450px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textColor='#033C50'
              id='economy-gauge'
              colors={['#01293C', '#00D2FF']}
              needleColor='#688EA0'
              needleBaseColor='#688EA0'
              formatTextValue={(value: any) => `+${value}%`}
            />
          </Card>
        </GaugeChartContainer>
        <Card style={{ flexGrow: 1 }}>
          <CardTitle>Carbon Price</CardTitle>
          <CarbonPriceChart />
        </Card>
      </div>
      <SectionTitleContainer>
        <SectionTitle>Carbon Balances of Impact Relayer Nodes</SectionTitle>
      </SectionTitleContainer>
      <CarbonTable columns={columns} data={tableData} />
    </Container>
  )
}

export default EconomyCarbon
