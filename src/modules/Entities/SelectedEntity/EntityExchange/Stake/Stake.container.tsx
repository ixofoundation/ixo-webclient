import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import { thousandSeparator } from 'common/utils/formatters'
import { getBalanceNumber } from 'common/utils/currency.utils'

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
    Header: 'MY DELEGATION (+REWARDS)',
    accessor: 'value',
  },
]

const Stake: React.FunctionComponent = () => {
  const { address: accountAddress } = useSelector((state: RootState) => state.account)

  const [validators, setValidators] = useState<ValidatorDataType[]>([])
  const [delegations, setDelegations] = useState<string[]>([])
  const [rewards, setRewards] = useState<string[]>([])

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
          getBalanceNumber(new BigNumber(item.tokens)).toFixed(0),
          ',',
        ),
        commission:
          Number(item.commission.commission_rates.rate * 100).toFixed(0) + '%',
        value: '0 IXO',
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
          .forEach((item: any, i: number) => {
            getDelegation(accountAddress, item.operator_address)
            getReward(accountAddress, item.operator_address)
          })
      })
      .catch(error => {
        console.log('Stake.container', error)
      })
  }

  const getDelegation = (delegatorAddress: string, validatorAddress: string): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}`)
      .then(response => {
        return response.data
      })
      .then(response => {
        const { delegation_response: { balance } } = response

        setDelegations(old => [
          ...old,
          getBalanceNumber(new BigNumber(balance.amount)).toFixed(0)
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
  const getReward = (delegatorAddress: string, validatorAddress: string): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`)
      .then(response => {
        return response.data
      })
      .then(response => {
        const { rewards } = response

        setRewards(old => [
          ...old,
          getBalanceNumber(new BigNumber(rewards[0].amount)).toFixed(0)
        ])
      })
      .catch(error => {
        console.log('Stake.container', error)
        setRewards(old => [
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
    // eslint-disable-next-line
  }, [accountAddress])

  useEffect(() => {
    if (delegations.length !== 0 &&
        rewards.length !== 0 &&
        delegations.length === validators.length &&
        rewards.length === validators.length) {
      const updatedValidators = validators.map((item: ValidatorDataType, i: number) => ({
        ...item,
        value: thousandSeparator(delegations[i], ',') + " IXO\n" + "(+" + thousandSeparator(rewards[i], ',') + ")"
      }))
      setValidators(updatedValidators)
    }
  // eslint-disable-next-line
  }, [delegations, rewards])

  return (
    <>
      <ValidatorTable columns={columns} data={validators} />
    </>
  )
}
export default Stake
