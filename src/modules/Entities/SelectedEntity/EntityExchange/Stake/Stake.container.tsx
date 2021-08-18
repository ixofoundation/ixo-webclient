import React from 'react'

import { ValidatorTable } from './components'

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

const Stake: React.FunctionComponent = () => {
  return (
    <>
      <ValidatorTable columns={columns} data={tableData} />
    </>
  )
}
export default Stake
