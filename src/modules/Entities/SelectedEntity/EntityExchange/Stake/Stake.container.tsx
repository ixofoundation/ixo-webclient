import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import { thousandSeparator } from 'common/utils/formatters'
import { getBalanceNumber } from 'common/utils/currency.utils'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Table } from 'common/components/Dashboard'
import { EntityType } from 'modules/Entities/types'
import ChainCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/ChainCard/ChainCard'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import keysafe from 'common/keysafe/keysafe'
interface ValidatorDataType {
  userDid: string
  validatorAddress: string
  validatorLogo: string
  validatorName: {
    text: string
    link: string
  }
  validatorMission: string
  validatorVotingPower: string
  validatorCommission: string
  delegation: string
}

const columns = [
  {
    Header: 'VALIDATOR',
    accessor: 'validatorLogo',
  },
  {
    Header: 'NAME',
    accessor: 'validatorName',
    align: 'left',
  },
  {
    Header: 'MISSION',
    accessor: 'validatorMission',
    align: 'left',
  },
  {
    Header: 'VOTING POWER',
    accessor: 'validatorVotingPower',
  },
  {
    Header: 'COMMISSION',
    accessor: 'validatorCommission',
  },
  {
    Header: 'MY DELEGATION (+REWARDS)',
    accessor: 'delegation',
  },
]

const Stake: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { 
    address: accountAddress,
    // userInfo: {
    //   didDoc: {
    //     did: userDid
    //   }
    // }
    userInfo
  } = useSelector((state: RootState) => state.account)

  const {
    entities
  } = useSelector((state: RootState) => state.entities)

  const [validators, setValidators] = useState<ValidatorDataType[]>([])
  const [delegations, setDelegations] = useState<string[]>([])
  const [rewards, setRewards] = useState<string[]>([])
  const [logos, setLogos] = useState<string[]>([])

  const [chainList, setChainList] = useState<ExplorerEntity[]>([])
  const [selectedChain, setSelectedChain] = useState<number>(-1)

  const mapToValidator = (fetchedData: unknown[]): ValidatorDataType[] => {
    return fetchedData
      .sort((a: any, b: any) => Number(b.tokens) - Number(a.tokens))
      .map((item: any) => ({
        userDid: userInfo.didDoc.did,
        validatorAddress: item.operator_address,
        validatorLogo: item.description.moniker,
        validatorName: {
          text: item.description.moniker,
          link: item.description.website,
        },
        validatorMission: item.description.details,
        validatorVotingPower: thousandSeparator(
          getBalanceNumber(new BigNumber(item.tokens)).toFixed(0),
          ',',
        ),
        validatorCommission:
          Number(item.commission.commission_rates.rate * 100).toFixed(0) + '%',
        delegation: '0 IXO',
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
            getLogo(item.description.identity)
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
  const getLogo = (identity: string): void => {
    if (!identity) {
      setLogos(old => [
        ...old,
        require('assets/img/relayer.png')
      ])
      return;
    }
    Axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`)
      .then(response => {
        return response.data
      })
      .then(response => {
        const { them } = response

        setLogos(old => [
          ...old,
          them[0].pictures.primary.url
        ])
      })
      .catch(error => {
        console.log('Stake.container', error)
        setLogos(old => [
          ...old,
          require('assets/img/relayer.png')
        ])
      })    
  }

  useEffect(() => {
    dispatch(getEntities())
    // eslint-disable-next-line
  }, [])

  useEffect(() => { //  temporary placeholder
    console.log(entities)
    if (!entities) {
      return;
    }
    let filtered = entities.filter((entity) => 
      entity.type === EntityType.Cell
    ).filter((entity) => 
      entity.ddoTags.some(
        (entityCategory) => 
          entityCategory.name === 'Cell Type' &&
          entityCategory.tags.includes('Chain') //  'Chain'
      )
    )
    console.log(filtered)
    setChainList(filtered)
  }, [entities])

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
        delegation: thousandSeparator(delegations[i], ',') + " IXO\n(+" + thousandSeparator(rewards[i], ',') + ")"
      }))
      setValidators(updatedValidators)
    }
  // eslint-disable-next-line
  }, [delegations, rewards])

  useEffect(() => {
    if (logos.length !== 0 &&
      logos.length === validators.length) {
      const updatedValidators = validators.map((item: ValidatorDataType, i: number) => ({
        ...item,
        validatorLogo: logos[i]
      }))
      setValidators(updatedValidators)
    }
  // eslint-disable-next-line
  }, [logos])

  useEffect(() => {
    if (selectedChain > -1) {
      if (!userInfo) { 
        keysafe.popupKeysafe()
      }
    }
    // eslint-disable-next-line
  }, [selectedChain])

  return (
    <div className='container-fluid'>
      {selectedChain === -1 && (
        <div className='row'>
          {chainList && chainList.map((chain, key) => (
            <div className='col-3' key={key}>
              <ChainCard
                did={chain.did}
                name={chain.name}
                logo={chain.logo}
                image={chain.image}
                sdgs={chain.sdgs}
                description={chain.description}
                badges={chain.badges}
                version={chain.version}
                termsType={chain.termsType}
                isExplorer={false}
                handleClick={() => {setSelectedChain(key)}}
              />
            </div>
          ))}
        </div>
      )}
      {selectedChain > -1 && (
        <div className='row'>
          <Table columns={columns} data={validators} />
        </div>
      )}
      
    </div>
  )
}
export default Stake
