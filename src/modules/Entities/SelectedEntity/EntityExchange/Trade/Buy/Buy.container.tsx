import React, { useEffect, useMemo, useState } from 'react'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import Axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import AssetCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'

import {
  CardBody,
  CardHeader,
  SettingsButton,
  SubmitButton,
  Overlay,
  Stat,
  CardHeaderText,
} from './Buy.container.styles'
import {
  TradeWrapper,
  AssetCardWrapper,
  TradePanel,
} from '../Trade.container.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import {
  findDenomByMinimalDenom,
  minimalAmountToAmount,
} from 'modules/Account/Account.utils'

import SettingsIcon from 'assets/images/exchange/setting.svg'
import SettingsHighlightIcon from 'assets/images/exchange/setting-highlight.svg'
import { selectSelectedAccountAddress } from '../../EntityExchange.selectors'

import * as _ from 'lodash'
import { SettingsCard, PairListCard, SelectTradeMethod } from '../components'
import { getUSDRateByCoingeckoId } from 'utils'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'states/configs/configs.hooks'
import { AssetType } from 'states/configs/configs.types'

const Buy: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useSelector(selectSelectedAccountAddress)
  const [viewSettings, setViewSettings] = useState(false)

  const buyNFT = useMemo(
    () => ({
      image: '',
      name: 'SuperMoto Clean cooking',
      remaining: 101,
      total: 3000,
      price: 250,
    }),
    [],
  )

  const [balances, setBalances] = useState({})
  const [buyWithToken, setBuyWithToken] = useState<AssetType | undefined>(
    undefined,
  )
  const [buyWithTokenEntity, setBuyWithTokenEntity] = useState<ApiListedEntity>(
    undefined,
  )
  const [buyWithTokenUSDRate, setBuyWithTokenUSDRate] = useState(0)
  const buyWithTokenBalance = useMemo(
    () => balances[buyWithToken?.display] ?? '0',
    [balances, buyWithToken],
  )

  // for settings
  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)
  const networkName = useMemo(() => getRelayerNameByChainId(chainId), [
    getRelayerNameByChainId,
    chainId,
  ])
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>(
    'none',
  )

  const assets = useMemo(() => getAssetsByChainId(chainId), [
    getAssetsByChainId,
    chainId,
  ])
  const pairList = useMemo<AssetType[]>(
    () =>
      assets.filter((currency) => currency.display !== buyWithToken?.display),
    [assets, buyWithToken],
  )

  const [swapError, swapErrorMsg] = useMemo(() => {
    if (
      new BigNumber(buyNFT.price).isGreaterThan(
        new BigNumber(buyWithTokenBalance * buyWithTokenUSDRate),
      )
    ) {
      return [true, 'Insufficient Balance']
    }
    return [false, 'Review My Order']
  }, [buyNFT, buyWithTokenBalance, buyWithTokenUSDRate])

  const canSubmit = useMemo(() => swapError, [swapError])
  const panelHeight = '420px'

  const handleSubmit = (): void => {
    //
  }

  // TODO: maybe this API calling should be processed in Redux in the future
  useEffect(() => {
    if (selectedAccountAddress) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/bank/balances/${selectedAccountAddress}`,
      )
        .then((response) => response.data)
        .then((response) => response.result)
        .then((response) =>
          response.map(({ denom, amount }) => ({
            denom: findDenomByMinimalDenom(denom),
            amount: minimalAmountToAmount(denom, amount),
          })),
        )
        .then((response) => _.mapValues(_.keyBy(response, 'denom'), 'amount'))
        .then((response) => setBalances(response))
        .catch((e) => {
          console.error(e)
          setBalances({})
        })
    }
  }, [selectedAccountAddress])

  useEffect(() => {
    if (!walletType || !selectedAccountAddress) {
      const { pathname } = history.location
      const chunks = pathname.split('/')
      chunks.pop()
      history.push(chunks.join('/'))
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

  useEffect(() => {
    if (buyWithToken?.coingeckoId) {
      getUSDRateByCoingeckoId(buyWithToken?.coingeckoId).then((rate): void =>
        setBuyWithTokenUSDRate(rate),
      )
    }
    if (buyWithToken?.entityId) {
      blocksyncApi.project
        .getProjectByProjectDid(buyWithToken?.entityId)
        .then((apiEntity) => {
          setBuyWithTokenEntity(apiEntity)
        })
    }
  }, [buyWithToken])

  const renderAssetCard = (entity): JSX.Element => (
    <>
      <CardHeader>&nbsp;</CardHeader>
      <AssetCard
        id={'asset-card'}
        did={entity.projectDid}
        name={entity.data.name}
        logo={entity.data.logo}
        image={entity.data.image}
        sdgs={entity.data.sdgs}
        description={entity.data.description}
        dateCreated={moment(entity.data.createdOn)}
        badges={[]}
        version={''}
        termsType={TermsOfUseType.PayPerUse}
        isExplorer={false}
      />
    </>
  )

  const renderSwapDetail = (): JSX.Element => (
    <>
      <SubmitButton
        className="mb-2"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {swapErrorMsg}
      </SubmitButton>
      <div className="px-2">
        <Stat className="mb-1">
          <span>Network:</span>
          <span>{networkName}</span>
        </Stat>
        <Stat className="mb-1">
          <span>Transaction Fee:</span>
          <span>0.33% (0.12 ATOM) ≈ $1.49</span>
        </Stat>
      </div>
    </>
  )

  const renderOverlay = (): JSX.Element => (
    <Overlay className="d-flex justify-content-center align-itmes-center">
      for
    </Overlay>
  )

  const renderSettingsButton = (): JSX.Element => (
    <SettingsButton
      onClick={(): void => {
        setViewSettings(!viewSettings)
      }}
    >
      <img
        src={!viewSettings ? SettingsIcon : SettingsHighlightIcon}
        alt="ts"
      />
    </SettingsButton>
  )

  const renderBuyPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <CardHeaderText>
          <span>I want to&nbsp;</span>
          <SelectTradeMethod />
        </CardHeaderText>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={'auto'} className="mb-2">
        <div className="position-relative">
          {/*  */}
          <div style={{ marginBottom: '10px' }} />
          {/*  */}
          {renderOverlay()}
        </div>
      </CardBody>

      <CardBody className="gap">{renderSwapDetail()}</CardBody>
    </>
  )

  const renderPairListPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <CardHeaderText>
          <span>I want to&nbsp;</span>
          <SelectTradeMethod />
        </CardHeaderText>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={panelHeight}>
        <PairListCard
          pairList={pairList}
          balances={balances}
          viewPairList={'from'}
          handleSelectToken={(currency): void => {
            setViewPairList('none')
            setBuyWithToken(currency)
          }}
        >
          {/*  */}
        </PairListCard>
      </CardBody>
    </>
  )

  const renderSettingsPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <CardHeaderText>
          <span>Settings</span>
        </CardHeaderText>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={panelHeight}>
        <SettingsCard chainId={chainId} setChainId={setChainId} />
      </CardBody>
    </>
  )

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className="d-flex">
          <AssetCardWrapper>
            {buyWithTokenEntity && renderAssetCard(buyWithTokenEntity)}
          </AssetCardWrapper>
          <TradePanel>
            {!viewSettings &&
              (viewPairList === 'none'
                ? renderBuyPanel()
                : renderPairListPanel())}
            {viewSettings && renderSettingsPanel()}
          </TradePanel>
        </div>
      )}
    </TradeWrapper>
  )
}
export default Buy
