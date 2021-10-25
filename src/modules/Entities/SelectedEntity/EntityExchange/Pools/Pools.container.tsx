import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { RootState } from 'common/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { FilterWrapper, InputWrapper } from './Pools.container.styles'

import ResetIcon from 'assets/images/exchange/reset.svg'
import SearchIcon from 'assets/images/exchange/search.svg'

enum PoolFilterTypes {
  ALL = 'All',
  TYPE = 'Type',
  PAIRS = 'Pairs',
  STAGE = 'Stage',
}

const Pools: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { entities } = useSelector((state: RootState) => state.entities)

  const [poolList, setPoolList] = useState<ExplorerEntity[]>([])
  const [filter, setFilter] = useState({
    type: PoolFilterTypes.ALL,
    search: '',
  })

  useEffect(() => {
    dispatch(getEntities())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //  temporary placeholder
    if (!entities) {
      return
    }
    const filtered = entities
      .filter((entity) => entity.type === EntityType.Project)
      .filter((entity) =>
        entity.ddoTags.some(
          (entityCategory) =>
            entityCategory.name === 'Asset Type' &&
            entityCategory.tags.includes('Pool'),
        ),
      )
    setPoolList(filtered)
  }, [entities])

  const handleFilterChange = (type: PoolFilterTypes, search: string): void => {
    setFilter({ type, search })
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <FilterWrapper>
          <button
            className={cx({ active: filter.type === PoolFilterTypes.ALL })}
            onClick={(): void =>
              handleFilterChange(PoolFilterTypes.ALL, filter.search)
            }
          >
            All
          </button>
          <button
            className={cx({ active: filter.type === PoolFilterTypes.TYPE })}
            onClick={(): void =>
              handleFilterChange(PoolFilterTypes.TYPE, filter.search)
            }
          >
            Type
          </button>
          <button
            className={cx({ active: filter.type === PoolFilterTypes.PAIRS })}
            onClick={(): void =>
              handleFilterChange(PoolFilterTypes.PAIRS, filter.search)
            }
          >
            Pairs
          </button>
          <button
            className={cx({ active: filter.type === PoolFilterTypes.STAGE })}
            onClick={(): void =>
              handleFilterChange(PoolFilterTypes.STAGE, filter.search)
            }
          >
            Stage
          </button>
          <button
            className='reset'
            onClick={(): void => handleFilterChange(PoolFilterTypes.ALL, '')}
          >
            <img src={ResetIcon} alt="reset" />
            Reset
          </button>
          <InputWrapper>
            <input
              placeholder="Search pools"
              value={filter.search}
              onChange={(e: any): void =>
                handleFilterChange(filter.type, e.target.value)
              }
            />
            <img src={SearchIcon} alt="search" />
          </InputWrapper>
        </FilterWrapper>
      </div>

      <div className="row">
        {poolList.length > 0 &&
          poolList.map((airdrop, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={i}>
              <DataCard
                did={airdrop.did}
                name={airdrop.name}
                logo={airdrop.logo}
                image={airdrop.image}
                sdgs={airdrop.sdgs}
                description={airdrop.description}
                badges={[]}
                version={''}
                termsType={TermsOfUseType.PayPerUse}
                isExplorer={false}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
export default Pools
