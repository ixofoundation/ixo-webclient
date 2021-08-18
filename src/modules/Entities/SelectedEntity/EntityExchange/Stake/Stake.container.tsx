import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'

import { ValidatorTable } from './components'
interface ValidatorDataType {
  validator: string
  name: string
  mission: string
  votingPower: string
  commission: string
  value: string
}

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

const tableData: ValidatorDataType[] = [
  {
    validator: '1',
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: '1',
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: '1',
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
  {
    validator: '1',
    name: 'Relayer Name',
    mission: '300,000',
    votingPower: '0.5%',
    commission: '10%',
    value: '13.3%',
  },
]

const Stake: React.FunctionComponent = () => {
  const { projectDID } = useParams<{ projectDID: string }>()

  const [tokensStaked, setTokensStaked] = useState(-1)
  const [accountAddress, setAccountAddress] = useState(null)
  const [validators, setValidators] = useState<ValidatorDataType[]>([])

  const mapToValidator = (fetchedData: unknown[]): ValidatorDataType[] => {
    return fetchedData.map((item: any) => ({
      validator: item.description.moniker,
      name: item.description,
      mission: '300,000',
      votingPower: '0.5%',
      commission:
        Number(item.commission.commission_rates.rate).toFixed(2) + '%',
      value: tokensStaked + ' IXO',
    }))
  }

  const getProjectAccounts = (): void => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`,
    ).then(response => {
      setAccountAddress(response.data.map[projectDID])
    })
  }

  const getTokensStaked = (address: string): void => {
    if (address) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/staking/delegators/${address}/delegations`,
      ).then(response => {
        const entries = response.data.result
        if (entries.length) {
          const total = entries
            .map(entry => new BigNumber(entry.balance.amount))
            .reduce((total: BigNumber, entry: BigNumber) => total.plus(entry))
          setTokensStaked(getBalanceNumber(total))
        } else {
          setTokensStaked(0)
        }
      })
    }
  }

  const getValidators = (): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/rest/staking/validators`)
      .then(response => {
        return response.data
      })
      .then(response => {
        const { result } = response
        setValidators(mapToValidator(result))
      })
      .catch(error => {
        console.log('Stake.container', error)
      })
  }

  useEffect(() => {
    getProjectAccounts()
  }, [])

  useEffect(() => {
    if (!accountAddress) {
      return
    }
    console.log(accountAddress)
    getTokensStaked(accountAddress)
  }, [accountAddress])

  useEffect(() => {
    if (tokensStaked < 0) {
      return
    }
    console.log(tokensStaked)
    getValidators()
  }, [tokensStaked])

  return (
    <>
      <ValidatorTable columns={columns} data={validators} />
    </>
  )
}
export default Stake
