import React, { useEffect } from 'react'
import Axios from 'axios'

import { ValidatorTable } from './components'

const columns = [
  {
    Header: 'VALIDATOR',
    accessor: 'validator',
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
  const getValidators = (): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/rest/staking/validators`)
      .then(response => {
        return response.data
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log('Stake.container', error)
      })
  }

  useEffect(() => {
    getValidators()
  }, [])
  return (
    <>
      <ValidatorTable columns={columns} data={tableData} />
    </>
  )
}
export default Stake
