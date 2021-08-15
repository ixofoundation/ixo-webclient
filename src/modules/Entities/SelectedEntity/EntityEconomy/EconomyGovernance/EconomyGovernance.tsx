import React from 'react'
import CarbonTable from './components/GovernanceTable'
import {
  Container,
  Card,
  CardTitle,
  SectionTitleContainer,
  SectionTitle,
} from '../EntityEconomy.styles'
import GovernanceProposal from './components/GovernanceProposal'

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

const EconomyGovernance: React.FunctionComponent = () => {
  return (
    <Container>
      <SectionTitleContainer>
        <SectionTitle>Current Governance Proposals</SectionTitle>
      </SectionTitleContainer>
      <GovernanceProposal />

      <SectionTitleContainer>
        <SectionTitle>Past Governance Proposals</SectionTitle>
      </SectionTitleContainer>
      <CarbonTable columns={columns} data={tableData} />
    </Container>
  )
}

export default EconomyGovernance
