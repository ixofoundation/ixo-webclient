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
import {
  SettingsCard,
  PairListCard,
  SelectTradeMethod,
  NftSelectBox,
  TokenSelectBox,
  NftPairListCard,
} from '../components'
import { getUSDRateByCoingeckoId } from 'utils'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'states/configs/configs.hooks'
import { AssetType } from 'states/configs/configs.types'
import { NftBuyModal } from 'common/components/ControlPanel/Actions'

const NftAssetList = [
  {
    symbol: 'CSTOVE',
    image: require('assets/nfts/SuperMoto.svg'),
    name: 'SuperMoto Clean cooking1',
    entityId: 'did:ixo:FKNrjmRpqbTFKtnLar8dxo',
  },
]

const Buy: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useSelector(selectSelectedAccountAddress)
  const [viewSettings, setViewSettings] = useState(false)
  const [openNftBuyModal, setOpenNftBuyModal] = useState(false)

  const [balances, setBalances] = useState({})

  const [nftAsset, setNftAsset] = useState(undefined)
  const [nftEntity, setNftEntity] = useState<ApiListedEntity>(undefined)
  // TODO: nftPrice should be fetched from blockchain(cellnode)
  const nftPrice = 250
  // TODO: nftRemainings should be fetched from blocksync
  const nftRemainings = 301
  // TODO: nftTotals should be fetched from blocksync
  const nftTotals = 1000

  const [token, setToken] = useState<AssetType | undefined>(undefined)
  const [tokenUSDRate, setTokenUSDRate] = useState(0)
  const tokenBalance = useMemo(() => balances[token?.display] ?? '0', [
    balances,
    token,
  ])

  const [isCreditCard, setIsCreditCard] = useState<boolean>(false)

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
    () => assets.filter((currency) => currency.display !== token?.display),
    [assets, token],
  )

  const [swapError, swapErrorMsg] = useMemo(() => {
    if (
      new BigNumber(nftPrice).isGreaterThan(
        new BigNumber(tokenBalance * tokenUSDRate),
      )
    ) {
      return [true, 'Insufficient Balance']
    }
    return [false, 'Review My Order']
  }, [nftPrice, tokenBalance, tokenUSDRate])

  const canSubmit = useMemo(() => !swapError, [swapError])
  const panelHeight = '420px'

  const [fromFocused, setFromFocused] = useState(true)

  const handleSubmit = (): void => {
    setOpenNftBuyModal(true)
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
    if (nftAsset?.entityId) {
      blocksyncApi.project
        .getProjectByProjectDid(nftAsset?.entityId)
        .then((apiEntity) => {
          setNftEntity(apiEntity)
        })
    }
  }, [nftAsset])

  useEffect(() => {
    if (token?.coingeckoId) {
      getUSDRateByCoingeckoId(token?.coingeckoId).then((rate): void =>
        setTokenUSDRate(rate),
      )
    }
  }, [token])

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
        className="mb-4"
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
      using
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
          <NftSelectBox
            isSelected={fromFocused}
            asset={nftAsset}
            price={nftPrice}
            remainings={nftRemainings}
            totals={nftTotals}
            handleFocused={(): void => setFromFocused(true)}
            handleSelect={(): void => setViewPairList('from')}
          />
          <div style={{ marginBottom: '10px' }} />
          {isCreditCard ? (
            <TokenSelectBox
              isSelected={!fromFocused}
              selectBoxType={'CreditCard'}
              handleFocused={(): void => setFromFocused(false)}
              handleSelect={(): void => setViewPairList('to')}
            />
          ) : (
            <TokenSelectBox
              isSelected={!fromFocused}
              asset={token}
              price={nftPrice}
              usdRate={tokenUSDRate}
              handleFocused={(): void => setFromFocused(false)}
              handleSelect={(): void => setViewPairList('to')}
            />
          )}
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
        {viewPairList === 'from' && (
          <NftPairListCard
            pairList={NftAssetList}
            viewPairList={viewPairList}
            isTriangle={false}
            handleSelectToken={(asset): void => {
              setViewPairList('none')
              setNftAsset(asset)
            }}
          >
            <NftSelectBox
              isSelected={fromFocused}
              asset={nftAsset}
              price={nftPrice}
              remainings={nftRemainings}
              totals={nftTotals}
              handleFocused={(): void => setFromFocused(true)}
              handleSelect={(): void => setViewPairList('none')}
              isLayout={false}
            />
          </NftPairListCard>
        )}
        {viewPairList === 'to' && (
          <PairListCard
            pairList={pairList}
            balances={balances}
            viewPairList={viewPairList}
            isTriangle={false}
            hasCreditCard
            handleSelectToken={(currency): void => {
              setViewPairList('none')
              if (currency) {
                setToken(currency)
                setIsCreditCard(false)
              } else {
                setToken(undefined)
                setIsCreditCard(true)
              }
            }}
          >
            {isCreditCard ? (
              <TokenSelectBox
                isSelected={!fromFocused}
                selectBoxType={'CreditCard'}
                handleFocused={(): void => setFromFocused(false)}
                handleSelect={(): void => setViewPairList('to')}
                isLayout={false}
              />
            ) : (
              <TokenSelectBox
                isSelected={!fromFocused}
                asset={token}
                price={nftPrice}
                usdRate={tokenUSDRate}
                handleFocused={(): void => setFromFocused(false)}
                handleSelect={(): void => setViewPairList('none')}
                isLayout={false}
              />
            )}
          </PairListCard>
        )}
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
            {nftEntity && renderAssetCard(nftEntity)}
          </AssetCardWrapper>
          <TradePanel>
            {!viewSettings &&
              (viewPairList === 'none'
                ? renderBuyPanel()
                : renderPairListPanel())}
            {viewSettings && renderSettingsPanel()}
          </TradePanel>
          <AssetCardWrapper />
        </div>
      )}
      <NftBuyModal
        open={openNftBuyModal}
        setOpen={setOpenNftBuyModal}
        nftAsset={nftAsset}
        price={nftPrice}
        nftAmount={1}
        token={token}
        nftRemainings={nftRemainings}
      />
    </TradeWrapper>
  )
}
export default Buy
