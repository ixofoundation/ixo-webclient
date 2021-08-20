import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { thousandSeparator } from 'common/utils/formatters'

import { ValidatorTable } from './components'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
interface ValidatorDataType {
  validatorAddress: string
  validator: string
  name: {
    text: string
    link: string
  }
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
  const { address: accountAddress } = useSelector((state: RootState) => state.account)

  const [validators, setValidators] = useState<ValidatorDataType[]>([])
  const [delegations, setDelegations] = useState<string[]>([])

  const mapToValidator = (fetchedData: unknown[]): ValidatorDataType[] => {
    return fetchedData
      .sort((a: any, b: any) => Number(b.tokens) - Number(a.tokens))
      .map((item: any) => ({
        validatorAddress: item.operator_address,
        validator: item.description.moniker,
        name: {
          text: item.description.moniker,
          link: item.description.website,
        },
        mission: item.description.details,
        votingPower: thousandSeparator(
          (Number(item.tokens) / 1000000).toFixed(0),
          ',',
        ),
        commission:
          Number(item.commission.commission_rates.rate * 100).toFixed(0) + '%',
        value: ' IXO',
      }))
  }

  const getValidators = (): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/rest/staking/validators`)
      .then(response => {
        return response.data
      })
      .then((response) => {
        const { result } = response
        setValidators(mapToValidator(result))
        result.sort((a: any, b: any) => Number(b.tokens) - Number(a.tokens))
          .forEach((item: any, i: number) => getDelegation(accountAddress, item.operator_address, i))
      })
      .catch(error => {
        console.log('Stake.container', error)
      })
  }

  const getDelegation = (delegatorAddress: string, validatorAddress: string, index: number): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}`)
      .then(response => {
        return response.data
      })
      .then(response => {
        const { delegation_response: { balance } } = response

        setDelegations(old => [
          ...old,
          balance.amount
        ])
      })
      .catch(error => {
        console.log('Stake.container', error)
        setDelegations(old => [
          ...old,
          "0"
        ])
      })
  }
  useEffect(() => {
    if (!accountAddress) {
      return
    }
    console.log(accountAddress)
    getValidators()
  }, [accountAddress])

  useEffect(() => {
    console.log(delegations)
    if (delegations.length !== 0 && delegations.length === validators.length) {
      const updatedValidators = validators.map((item: ValidatorDataType, i: number) => ({
        ...item,
        value: thousandSeparator(Number(delegations[i]), ',') + " IXO"
      }))
      setValidators(updatedValidators)
    }
  }, [delegations])

  return (
    <>
      <ValidatorTable columns={columns} data={validators} />
    </>
  )
}
export default Stake
