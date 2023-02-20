import React, { useEffect, useMemo, useState } from 'react'
import blocksyncApi from 'api/blocksync/blocksync'
import Axios from 'axios'
import moment from 'moment'
import { useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'
import { ApiListedEntity } from 'api/blocksync/types/entities'

import { CardBody, CardHeader, SettingsButton, SubmitButton, Overlay, Stat, CardHeaderText } from './Bid.styles'
import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import { findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'

import SliderSettingsIcon from 'assets/images/icon-slider-settings.svg'
import { selectSelectedAccountAddress } from '../../../../../../redux/selectedEntityExchange/entityExchange.selectors'

import * as _ from 'lodash'
import {
  SettingsCard,
  PairListCard,
  SelectTradeMethod,
  NftSelectBox,
  NftPairListCard,
  AmountInputBox,
} from '../Components'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import { requireCheckDefault } from 'utils/images'

const NftAssetList = [
  {
    image: requireCheckDefault(require('assets/nfts/SuperMoto.svg')),
    name: 'SuperMoto Clean cooking1',
    entityId: 'did:ixo:FKNrjmRpqbTFKtnLar8dxo',
  },
]

const Bid: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  const [viewSettings, setViewSettings] = useState(false)

  const [balances, setBalances] = useState({})

  const [nftAsset, setNftAsset] = useState<any>(undefined)
  const [nftEntity, setNftEntity] = useState<ApiListedEntity | undefined>(undefined)
  // TODO: nftPrice should be fetched from blockchain(cellnode)
  const nftPrice = 250
  // TODO: nftRemainings should be fetched from blocksync
  const nftRemainings = 301
  // TODO: nftTotals should be fetched from blocksync
  const nftTotals = 1000

  const [token, setToken] = useState<AssetType | undefined>(undefined)
  const [tokenUSDRate, setTokenUSDRate] = useState(0)
  const [tokenAmount, setTokenAmount] = useState<BigNumber>(new BigNumber(0))
  const tokenBalance = useMemo(() => balances[token!.display!] ?? '0', [balances, token])

  // for settings
  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)
  const networkName = useMemo(() => getRelayerNameByChainId(chainId!), [getRelayerNameByChainId, chainId])
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')

  const assets = useMemo(() => getAssetsByChainId(chainId!), [getAssetsByChainId, chainId])
  const pairList = useMemo<AssetType[]>(
    () => assets.filter((currency: any) => currency.display !== token?.display),
    [assets, token],
  )

  const [swapError, swapErrorMsg] = useMemo(() => {
    return [false, 'Review My Order']
  }, [])

  const canSubmit = useMemo(
    () => !swapError && token && new BigNumber(tokenAmount).isGreaterThan(new BigNumber(0)),
    [swapError, token, tokenAmount],
  )
  const panelHeight = '420px'

  const [fromFocused, setFromFocused] = useState(true)

  const handleTokenAmountChange = (value: any): void => {
    if (!value) {
      setTokenAmount(new BigNumber(0))
      return
    }
    if (value.toString().endsWith('.')) {
      return
    }
    setTokenAmount(new BigNumber(value))
  }

  const handleSubmit = (): void => {
    //
  }

  // TODO: maybe this API calling should be processed in Redux in the future
  useEffect(() => {
    if (selectedAccountAddress) {
      Axios.get(`${process.env.REACT_APP_GAIA_URL}/bank/balances/${selectedAccountAddress}`)
        .then((response) => response.data)
        .then((response) => response.result)
        .then((response) =>
          response.map(({ denom, amount }: any) => ({
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
      blocksyncApi.project.getProjectByProjectDid(nftAsset?.entityId).then((apiEntity) => {
        setNftEntity(apiEntity)
      })
    }
  }, [nftAsset])

  useEffect(() => {
    if (token?.coingeckoId) {
      getUSDRateByCoingeckoId(token?.coingeckoId).then((rate): void => setTokenUSDRate(rate))
    }
  }, [token])

  const renderAssetCard = (entity: any): JSX.Element => (
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
      <SubmitButton className='mb-4' onClick={handleSubmit} disabled={!canSubmit}>
        {swapErrorMsg}
      </SubmitButton>
      <div className='px-2'>
        <Stat className='mb-1'>
          <span>Network:</span>
          <span>{networkName}</span>
        </Stat>
        <Stat className='mb-1'>
          <span>Transaction Fee:</span>
          <span>0.33% (0.12 ATOM) ≈ $1.49</span>
        </Stat>
      </div>
    </>
  )

  const renderOverlay = (): JSX.Element => (
    <Overlay className='d-flex justify-content-center align-itmes-center'>with</Overlay>
  )

  const renderSettingsButton = (): JSX.Element => (
    <SettingsButton
      onClick={(): void => {
        setViewSettings(!viewSettings)
      }}
    >
      <img src={SliderSettingsIcon} alt='' />
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
      <CardBody height={'auto'} className='mb-2'>
        <div className='position-relative'>
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
          <AmountInputBox
            currency={token}
            isSelected={!fromFocused}
            isFromToken={false}
            usdRate={tokenUSDRate}
            amount={tokenAmount}
            balance={tokenBalance}
            handleAmountChange={handleTokenAmountChange}
            handleAssetSelect={(): void => setViewPairList('to')}
            handleFocused={(): void => setFromFocused(false)}
            isTriangle={false}
          />
          {renderOverlay()}
        </div>
      </CardBody>

      <CardBody className='gap'>{renderSwapDetail()}</CardBody>
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
            handleSelectToken={(currency): void => {
              setViewPairList('none')
              setToken(currency)
            }}
          >
            <AmountInputBox
              currency={token}
              isSelected={!fromFocused}
              isFromToken={false}
              usdRate={tokenUSDRate}
              amount={tokenAmount}
              balance={tokenBalance}
              handleAmountChange={handleTokenAmountChange}
              handleAssetSelect={(): void => setViewPairList('none')}
              handleFocused={(): void => setFromFocused(false)}
              isLayout={false}
              isTriangle={false}
            />
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
        <SettingsCard chainId={chainId!} setChainId={setChainId} />
      </CardBody>
    </>
  )

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className='d-flex'>
          <AssetCardWrapper>{nftEntity && renderAssetCard(nftEntity)}</AssetCardWrapper>
          <TradePanel>
            {!viewSettings && (viewPairList === 'none' ? renderBuyPanel() : renderPairListPanel())}
            {viewSettings && renderSettingsPanel()}
          </TradePanel>
          <AssetCardWrapper />
        </div>
      )}
    </TradeWrapper>
  )
}
export default Bid
