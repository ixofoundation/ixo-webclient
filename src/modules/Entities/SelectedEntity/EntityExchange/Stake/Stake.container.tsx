import React, { useEffect, useState } from 'react'
import { thousandSeparator } from 'common/utils/formatters'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Button, Table } from 'common/components/Dashboard'
import { EntityType } from 'modules/Entities/types'
import ChainCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/ChainCard/ChainCard'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { StatsLabel } from './Stake.container.styles'
import {
  getInflation,
  getTotalStaked,
  getTotalSupply,
  getValidators,
} from '../EntityExchange.actions'
import { broadCastMessage } from 'common/utils/keysafe'
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
  const {
    address: accountAddress,
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)
  const { entities } = useSelector((state: RootState) => state.entities)
  const { validators, TotalStaked, Inflation, TotalSupply } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )

  const [chainList, setChainList] = useState<ExplorerEntity[]>([])
  const [selectedChain, setSelectedChain] = useState<number>(-1)

  const [totalRewards, setTotalRewards] = useState<number>(0)
  const [APY, setAPY] = useState<number>(0)

  useEffect(() => {
    dispatch(getEntities())
    dispatch(getInflation())
    dispatch(getTotalSupply())
    dispatch(getTotalStaked())
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

  useEffect(() => {
    if (validators.length > 0) {
      const total = validators
        .map((validator) => validator.reward?.amount ?? 0)
        .reduce((total, entry) => total + entry)
      setTotalRewards(total)
    }
  }, [validators])

  const handleClaimRewards = (): void => {
    console.log('handle claim rewards')
    const msgs = []
    validators
      .filter((validator) => validator.reward)
      .forEach((validator) => {
        msgs.push({
          type: 'cosmos-sdk/MsgWithdrawDelegationReward',
          value: {
            delegator_address: accountAddress,
            validator_address: validator.address,
          },
        })
      })
    const fee = {
      amount: [{ amount: String(10000), denom: 'uixo' }],
      gas: String(400000),
    }

    broadCastMessage(
      userInfo,
      userSequence,
      userAccountNumber,
      msgs,
      '',
      fee,
      () => {
        console.log('callback')
      },
    )
  }

  useEffect(() => {
    if (TotalSupply !== 0 && TotalStaked !== 0 && Inflation !== 0) {
      setAPY((Inflation * TotalSupply) / TotalStaked)
    }
  }, [TotalSupply, TotalStaked, Inflation])

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
              {`Inflation: ${(Inflation * 100).toFixed(0)}%`}
            </StatsLabel>
            <StatsLabel className="pr-5">
              {`APY: ${APY.toFixed(1)}%`}
            </StatsLabel>
            <Button onClick={handleClaimRewards}>
              {`Claim Reward: ${thousandSeparator(
                totalRewards.toFixed(2),
                ',',
              )} IXO`}
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
