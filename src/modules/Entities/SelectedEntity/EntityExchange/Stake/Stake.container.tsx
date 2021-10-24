import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import { thousandSeparator } from 'common/utils/formatters'
import { getBalanceNumber } from 'common/utils/currency.utils'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Button, Table } from 'common/components/Dashboard'
import { EntityType } from 'modules/Entities/types'
import ChainCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/ChainCard/ChainCard'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { StatsLabel } from './Stake.container.styles'
import { getValidators } from '../EntityExchange.actions'
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
    accessor: 'logo',
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
    accessor: 'delegation',
  },
]

const Stake: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { address: accountAddress } = useSelector(
    (state: RootState) => state.account,
  )
  const { entities } = useSelector((state: RootState) => state.entities)
  const { validators } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )

  const [chainList, setChainList] = useState<ExplorerEntity[]>([])
  const [selectedChain, setSelectedChain] = useState<number>(-1)

  const [inflation, setInflation] = useState<number>(0)
  const [supply, setSupply] = useState<number>(0)
  const [delegated, setDelegated] = useState<number>(0)
  const [APY, setAPY] = useState<number>(0)

  const getInflation = (): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/minting/inflation`)
      .then((response) => {
        return response.data
      })
      .then((response) => {
        const { result } = response
        setInflation(Number(result))
      })
      .catch((error) => {
        console.log('Stake.container', error)
      })
  }

  const getSupply = (): void => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/cosmos/bank/v1beta1/supply/uixo`,
    )
      .then((response) => {
        return response.data
      })
      .then((response) => {
        const {
          amount: { amount },
        } = response
        setSupply(getBalanceNumber(new BigNumber(amount)))
      })
      .catch((error) => {
        console.log('Stake.container', error)
      })
  }

  const getDelegated = (): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/pool`)
      .then((response) => {
        return response.data
      })
      .then((response) => {
        const { pool } = response
        const {
          bonded_tokens,
          // not_bonded_tokens
        } = pool
        setDelegated(getBalanceNumber(new BigNumber(bonded_tokens)))
      })
      .catch((error) => {
        console.log('Stake.container', error)
      })
  }

  useEffect(() => {
    dispatch(getEntities())
    getInflation()
    getSupply()
    getDelegated()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //  temporary placeholder
    if (!entities) {
      return
    }
    const filtered = entities
      .filter((entity) => entity.type === EntityType.Cell)
      .filter((entity) =>
        entity.ddoTags.some(
          (entityCategory) =>
            entityCategory.name === 'Cell Type' &&
            entityCategory.tags.includes('Chain'), //  'Chain'
        ),
      )
    setChainList(filtered)
  }, [entities])

  useEffect(() => {
    if (!accountAddress) {
      return
    }
    dispatch(getValidators(accountAddress))
    // eslint-disable-next-line
  }, [accountAddress])

  const handleClaimRewards = (): void => {
    console.log('handle claim rewards')
  }

  useEffect(() => {
    if (supply !== 0 && delegated !== 0 && inflation !== 0) {
      setAPY((inflation * supply) / delegated)
    }
  }, [supply, delegated, inflation])

  return (
    <div className="container-fluid">
      {selectedChain === -1 && (
        <div className="row">
          {chainList &&
            chainList.map((chain, key) => (
              <div className="col-3" key={key}>
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
                  handleClick={(): void => {
                    setSelectedChain(key)
                  }}
                />
              </div>
            ))}
        </div>
      )}
      {selectedChain > -1 && (
        <>
          <div className="row pb-4 justify-content-end align-items-center">
            <StatsLabel className="pr-5">
              {`Inflation: ${(inflation * 100).toFixed(0)}%`}
            </StatsLabel>
            <StatsLabel className="pr-5">
              {`APY: ${APY.toFixed(1)}%`}
            </StatsLabel>
            <Button onClick={handleClaimRewards}>
              {`Claim Reward: ${thousandSeparator(1, ',')} IXO`}
            </Button>
          </div>
          <div className="row">
            <Table columns={columns} data={validators} />
          </div>
        </>
      )}
    </div>
  )
}
export default Stake
