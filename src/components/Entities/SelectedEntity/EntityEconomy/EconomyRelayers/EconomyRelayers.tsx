import React, { Component } from 'react'
import { WorldMap } from 'components/Widgets/WorldMap/WorldMap'

import { MapWrapper } from './EconomyRelayers.styles'
import { Container, SectionTitleContainer, SectionTitle, ButtonWrapper } from '../EntityEconomy.styles'
import Table from './Components/Table'

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
    Header: 'IXO STAKED',
    accessor: 'ixoStaked',
  },
  {
    Header: 'VOTING POWER',
    accessor: 'votingPower',
  },
  {
    Header: 'COMMISSION',
    accessor: 'commission',
  },
  {
    Header: 'YIELD PER IXO',
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

class EconomyRelayers extends Component {
  render(): JSX.Element {
    return (
      <Container>
        <MapWrapper>
          <WorldMap markers={[]} />
        </MapWrapper>
        <SectionTitleContainer>
          <SectionTitle>Relayers in the Internet of Impact Hub</SectionTitle>
          <ButtonWrapper>
            <button>Stake</button>
            <button>Unstake</button>
          </ButtonWrapper>
        </SectionTitleContainer>
        <Table columns={columns} data={tableData} />
      </Container>
    )
  }
}

export default EconomyRelayers
