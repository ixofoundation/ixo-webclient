import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import { useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'
import { CardBody, CardHeader, SettingsButton, SubmitButton, Overlay, Stat, CardHeaderText } from './Buy.styles'
import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'

import { selectSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.selectors'
import * as _ from 'lodash'
import {
  SettingsCard,
  PairListCard,
  SelectTradeMethod,
  NftSelectBox,
  TokenSelectBox,
  NftPairListCard,
} from 'components/Sections/Exchange/Swap'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import NftBuyModal from 'components/ControlPanel/Actions/NftBuyModal'
import { requireCheckDefault } from 'utils/images'
import { useGetEntityById } from 'graphql/entities'

const NftAssetList = [
  {
    id: 101,
    symbol: 'CSTOVE',
    image: requireCheckDefault(require('assets/nfts/SuperMoto.svg')),
    name: 'SuperMoto Clean cooking1',
    entityId: 'did:ixo:FKNrjmRpqbTFKtnLar8dxo',
  },
]

const Buy: React.FunctionComponent = () => {
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const walletType = queryString.parse(search)?.wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  const [viewSettings, setViewSettings] = useState(false)
  const [openNftBuyModal, setOpenNftBuyModal] = useState(false)

  const [balances, setBalances] = useState({})

  const [nftAsset, setNftAsset] = useState<any>(undefined)
  const { data: nftEntity } = useGetEntityById(nftAsset?.entityId || '')

  // TODO: nftPrice should be fetched from blockchain(cellnode)
  const nftPrice = 250
  // TODO: nftRemainings should be fetched from blocksync
  const nftRemainings = 301
  // TODO: nftTotals should be fetched from blocksync
  const nftTotals = 1000

  const [token, setToken] = useState<AssetType | undefined>(undefined)
  const [tokenUSDRate, setTokenUSDRate] = useState(0)
  const tokenBalance = useMemo(() => balances[token!.display!] ?? '0', [balances, token])

  const [isCreditCard, setIsCreditCard] = useState<boolean>(false)

  // for settings
  const [chainId, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
  const networkName = useMemo(() => getRelayerNameByChainId(chainId!), [getRelayerNameByChainId, chainId])
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')

  const assets = useMemo(() => getAssetsByChainId(chainId!), [getAssetsByChainId, chainId])
  const pairList = useMemo<AssetType[]>(
    () => assets.filter((currency: any) => currency.display !== token?.display),
    [assets, token],
  )

  const [buyError, buyErrorMsg] = useMemo(() => {
    if (new BigNumber(nftPrice).isGreaterThan(new BigNumber(tokenBalance * tokenUSDRate)) && !isCreditCard) {
      return [true, 'Insufficient Balance']
    }
    return [false, 'Review My Order']
  }, [nftPrice, tokenBalance, tokenUSDRate, isCreditCard])

  const canSubmit = useMemo(() => !buyError, [buyError])
  const panelHeight = '420px'

  const [fromFocused, setFromFocused] = useState(true)

  const handleSubmit = (): void => {
    setOpenNftBuyModal(true)
  }

  // TODO: maybe this API calling should be processed in Redux in the future
  useEffect(() => {
    if (selectedAccountAddress) {
      Axios.get(`${process.env.NEXT_PUBLIC_GAIA_URL}/bank/balances/${selectedAccountAddress}`)
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
      const chunks = pathname.split('/')
      chunks.pop()
      navigate(chunks.join('/'))
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

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
        {buyErrorMsg}
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
    <Overlay className='d-flex justify-content-center align-itmes-center'>using</Overlay>
  )

  const renderSettingsButton = (): JSX.Element => (
    <SettingsButton
      onClick={(): void => {
        setViewSettings(!viewSettings)
      }}
    >
      <img src='/assets/images/icon-sliders-h-solid.svg' alt='' />
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
      <NftBuyModal
        open={openNftBuyModal}
        setOpen={setOpenNftBuyModal}
        nftAsset={nftAsset}
        price={nftPrice}
        nftAmount={1}
        token={token}
        isCreditCard={isCreditCard}
      />
    </TradeWrapper>
  )
}
export default Buy
