import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { RootState } from 'common/redux/types'
import { useDispatch, useSelector } from 'react-redux'
import DataCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AirdropCard/AirdropCard'
import { EntityType, TermsOfUseType } from 'modules/Entities/types'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { FilterWrapper, InputWrapper } from './Pools.container.styles'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'

import ResetIcon from 'assets/images/exchange/reset.svg'
import SearchIcon from 'assets/images/exchange/search.svg'
import SupplyLiquidityModal from 'common/components/ControlPanel/Actions/SupplyLiquidityModal'
import WithdrawLiquidityModal from 'common/components/ControlPanel/Actions/SupplyLiquidityModal'

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

  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [supplyLiquidityModalOpen, setSupplyLiquidityModalOpen] = useState(
    false,
  )
  const [withdrawLiquidityModalOpen, setWithdrawLiquidityModalOpen] = useState(
    false,
  )

  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)
  }

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
      .filter((entity) => entity.type === EntityType.Asset)
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
          {[
            PoolFilterTypes.ALL,
            PoolFilterTypes.TYPE,
            PoolFilterTypes.PAIRS,
            PoolFilterTypes.STAGE,
          ].map((type) => (
            <button
              key={type}
              className={cx({ active: filter.type === type })}
              onClick={(): void => handleFilterChange(type, filter.search)}
            >
              {type}
            </button>
          ))}
          <button
            className="reset"
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

      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={['keysafe', 'keplr']}
        />
      </ModalWrapper>

      <ModalWrapper
        isModalOpen={supplyLiquidityModalOpen}
        header={{
          title: 'Supply Liquidity',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setSupplyLiquidityModalOpen(false)}
      >
        <SupplyLiquidityModal
          walletType={walletType}
          accountAddress={selectedAddress}
          bondDid={'did:ixo:QFhUtLwzdxFHry4DjopjHt'} //  uixo:earthday
        />
      </ModalWrapper>

      <ModalWrapper
        isModalOpen={withdrawLiquidityModalOpen}
        header={{
          title: 'Withdraw Liquidity',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWithdrawLiquidityModalOpen(false)}
      >
        <WithdrawLiquidityModal
          walletType={walletType}
          accountAddress={selectedAddress}
          bondDid={'did:ixo:abc123'}
        />
      </ModalWrapper>
    </div>
  )
}
export default Pools
