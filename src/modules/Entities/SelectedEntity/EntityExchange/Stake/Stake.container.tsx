import React from 'react'

import { ValidatorTable } from './components'

const columns = [
  {
    Header: 'VALIDATOR',
    accessor: 'validator',
    width: '100px',
  },
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'MISSION',
    accessor: 'mission',
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
    Header: 'MY DELEGATION',
    accessor: 'value',
  },
]

const tableData = [
  {
    validator: 1,
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: 1,
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: 1,
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: 1,
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
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
