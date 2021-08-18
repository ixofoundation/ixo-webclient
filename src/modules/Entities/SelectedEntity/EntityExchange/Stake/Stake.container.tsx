import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import BigNumber from 'bignumber.js'

import { getBalanceNumber } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'

import { ValidatorTable } from './components'
interface ValidatorDataType {
  validatorAddress: string
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
    align: 'left',
  },
  {
    Header: 'MISSION',
    accessor: 'mission',
    align: 'left',
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

const Stake: React.FunctionComponent = () => {
  const { projectDID } = useParams<{ projectDID: string }>()

  const [tokensStaked, setTokensStaked] = useState(-1)
  const [accountAddress, setAccountAddress] = useState(null)
  const [validators, setValidators] = useState<ValidatorDataType[]>([])

  const mapToValidator = (fetchedData: unknown[]): ValidatorDataType[] => {
    return fetchedData
      .sort((a: any, b: any) => Number(b.tokens) - Number(a.tokens))
      .map((item: any) => ({
        validatorAddress: item.operator_address,
        validator: item.description.moniker,
        name: item.description,
        mission: item.description.details,
        votingPower: thousandSeparator(
          (Number(item.tokens) / 1000000).toFixed(0),
          ',',
        ),
        commission:
          Number(item.commission.commission_rates.rate * 100).toFixed(0) + '%',
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
