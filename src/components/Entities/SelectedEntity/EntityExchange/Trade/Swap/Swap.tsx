import React, { useEffect, useMemo, useState } from 'react'
import blocksyncApi from 'api/blocksync/blocksync'
import Axios from 'axios'
import moment from 'moment'
import { useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'
import { ApiListedEntity } from 'api/blocksync/types/entities'

import { CardBody, CardHeader, SettingsButton, SubmitButton, SwapButton, Stat, CardHeaderText } from './Swap.styles'
import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import { findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'

import SwapIcon from 'assets/images/exchange/swap.svg'
import SliderSettingsIcon from 'assets/images/icon-slider-settings.svg'
import {
  selectLiquidityPools,
  // selectAvailablePairs,
  selectSelectedAccountAddress,
} from '../../../../../../redux/selectedEntityExchange/entityExchange.selectors'

import * as _ from 'lodash'
import { SettingsCard, PairListCard, AmountInputBox, SelectTradeMethod } from '../Components'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import Tooltip from 'components/Tooltip/Tooltip'
import SwapModal from 'components/ControlPanel/Actions/SwapModal'
import { calcToAmount } from '../../../../../../redux/selectedEntityExchange/entityExchange.utils'

// const Currencies = [
//   {
//     denom: 'ixo',
//     minimalDenom: 'uixo',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/ixo.svg')),
//   },
//   {
//     denom: 'osmosis',
//     minimalDenom: 'uosmosis',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/osmo.svg')),
//   },
//   {
//     denom: 'xusd',
//     minimalDenom: 'xusd',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/osmo.svg')),
//   },
//   {
//     denom: 'ixo1',
//     minimalDenom: 'uixo1',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/ixo.svg')),
//   },
//   {
//     denom: 'osmosis1',
//     minimalDenom: 'uosmosis1',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/osmo.svg')),
//   },
//   {
//     denom: 'xusd1',
//     minimalDenom: 'xusd1',
//     decimals: 6,
//     imageUrl: requireCheckDefault(require('assets/tokens/osmo.svg')),
//   },
// ]

const Swap: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  // const availablePairs = useAppSelector(selectAvailablePairs)
  const liquidityPools = useAppSelector(selectLiquidityPools)

  const [viewSettings, setViewSettings] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  // opens pair list dropdown
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')

  const [fromUSDRate, setFromUSDRate] = useState(0)
  const [toUSDRate, setToUSDRate] = useState(0)

  const [fromToken, setFromToken] = useState<AssetType | undefined>(undefined)
  const [toToken, setToToken] = useState<AssetType | undefined>(undefined)

  const [fromAmount, setFromAmount] = useState<BigNumber>(new BigNumber(0))
  const [toAmount, setToAmount] = useState<BigNumber>(new BigNumber(0))

  const [fromEntity, setFromEntity] = useState<ApiListedEntity | undefined>(undefined)
  const [toEntity, setToEntity] = useState<ApiListedEntity | undefined>(undefined)

  // balances currently purchased and stored in wallet
  const [balances, setBalances] = useState({})

  const fromTokenBalance = useMemo(() => balances[fromToken!.display!] ?? '0', [balances, fromToken])

  const toTokenBalance = useMemo(() => balances[toToken!.display!] ?? '0', [balances, toToken])

  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)

  const [fromTokenSelected, setFromTokenSelected] = useState<boolean>(true)

  // slippage
  const [slippage, setSlippage] = useState<number>(3)

  const assets = useMemo(() => getAssetsByChainId(chainId!), [getAssetsByChainId, chainId])

  const networkName = useMemo(() => getRelayerNameByChainId(chainId!), [getRelayerNameByChainId, chainId])

  const [swapError, swapErrorMsg] = useMemo(() => {
    if (
      new BigNumber(fromAmount)
        .times(new BigNumber((Number(slippage) + 100) / 100))
        .isGreaterThan(new BigNumber(fromTokenBalance))
    ) {
      return [true, 'Price impact too high']
    }
    return [false, 'Review My Order']
  }, [fromAmount, fromTokenBalance, slippage])

  const canSubmit = useMemo(() => {
    return (
      fromToken &&
      toToken &&
      new BigNumber(fromAmount).isGreaterThan(new BigNumber(0)) &&
      new BigNumber(toAmount).isGreaterThan(new BigNumber(0)) &&
      !swapError
    )
  }, [fromToken, toToken, fromAmount, toAmount, swapError])

  // TODO: filter reserve amount available -> should not be first buy
  const pairList = useMemo<AssetType[]>(
    () =>
      assets
        // .filter((currency) =>
        //   availablePairs.some((pair) => currency.denom === pair),
        // )
        .filter((currency: any) => currency.display !== fromToken?.display && currency.display !== toToken?.display),
    [
      assets,
      fromToken,
      toToken,
      // availablePairs,
    ],
  )

  const selectedPoolDetail = useMemo(() => {
    if (!liquidityPools) {
      return undefined
    }
    return liquidityPools.find((pool) =>
      _.difference(pool.poolDetail!.reserve_tokens, [fromToken?.base, toToken?.base]),
    )?.poolDetail
  }, [liquidityPools, fromToken, toToken])

  console.log('selectedPoolDetail', selectedPoolDetail)

  const panelHeight = '420px'

  const handleSwapClick = (): void => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromAmountChange = (value: string | BigNumber): void => {
    if (!value) {
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
      return
    }
    if (value.toString().endsWith('.')) {
      return
    }

    const fromAmount = new BigNumber(value)
    setFromAmount(fromAmount)
    if (toToken) {
      setToAmount(calcToAmount(fromAmount, fromUSDRate, toUSDRate))
    }
  }

  const handleToAmountChange = (value: any): void => {
    if (!value) {
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
      return
    }
    if (value.toString().endsWith('.')) {
      return
    }

    const toAmount = new BigNumber(value)
    setToAmount(toAmount)
    if (fromToken) {
      setFromAmount(calcToAmount(toAmount, toUSDRate, fromUSDRate))
    }
  }

  const handleSubmit = (): void => {
    setOpenTransactionModal(true)
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
    if (fromToken?.coingeckoId) {
      getUSDRateByCoingeckoId(fromToken?.coingeckoId).then((rate): void => setFromUSDRate(rate))
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
    }
    if (fromToken?.entityId) {
      blocksyncApi.project.getProjectByProjectDid(fromToken?.entityId).then((apiEntity) => {
        setFromEntity(apiEntity)
      })
    }
  }, [fromToken])

  useEffect(() => {
    if (toToken?.coingeckoId) {
      getUSDRateByCoingeckoId(toToken?.coingeckoId).then((rate): void => setToUSDRate(rate))
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
    }
    if (toToken?.entityId) {
      blocksyncApi.project.getProjectByProjectDid(toToken?.entityId).then((apiEntity) => {
        setToEntity(apiEntity)
      })
    }
  }, [toToken])

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
      <SubmitButton className='mb-2' onClick={handleSubmit} disabled={!canSubmit}>
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
        <Stat className='mb-1' warning={swapError}>
          <Tooltip text={swapError ? `Exceeds My Maximum of ${slippage}%` : ``}>
            <span>Estimated Slippage:</span>
          </Tooltip>
          <Tooltip text={swapError ? `Exceeds My Maximum of ${slippage}%` : ``}>
            <span>{slippage} %</span>
          </Tooltip>
        </Stat>
      </div>
    </>
  )

  const renderSwapButton = (): JSX.Element => (
    <SwapButton className='d-flex justify-content-center align-itmes-center' onClick={handleSwapClick}>
      <img src={SwapIcon} alt='' />
    </SwapButton>
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

  const renderSwapPanel = (): JSX.Element => (
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
          <AmountInputBox
            currency={fromToken}
            isSelected={fromTokenSelected}
            isFromToken={true}
            usdRate={fromUSDRate}
            amount={fromAmount}
            balance={fromTokenBalance}
            handleAmountChange={handleFromAmountChange}
            handleAssetSelect={(): void => setViewPairList('from')}
            handleFocused={(): void => setFromTokenSelected(true)}
          />
          <div style={{ marginBottom: '10px' }} />
          <AmountInputBox
            currency={toToken}
            isSelected={!fromTokenSelected}
            isFromToken={false}
            usdRate={toUSDRate}
            amount={toAmount}
            balance={toTokenBalance}
            handleAmountChange={handleToAmountChange}
            handleAssetSelect={(): void => setViewPairList('to')}
            handleFocused={(): void => setFromTokenSelected(false)}
          />
          {renderSwapButton()}
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
        <PairListCard
          pairList={pairList}
          balances={balances}
          viewPairList={viewPairList}
          handleSelectToken={(currency): void => {
            setViewPairList('none')
            if (viewPairList === 'from') {
              setFromToken(currency)
            } else if (viewPairList === 'to') {
              setToToken(currency)
            }
          }}
        >
          {viewPairList === 'from' && (
            <AmountInputBox
              currency={fromToken}
              isSelected={fromTokenSelected}
              isFromToken={true}
              usdRate={fromUSDRate}
              amount={fromAmount}
              balance={fromTokenBalance}
              handleAmountChange={handleFromAmountChange}
              handleAssetSelect={(): void => setViewPairList('none')}
              handleFocused={(): void => setFromTokenSelected(true)}
              isLayout={false}
            />
          )}
          {viewPairList === 'to' && (
            <AmountInputBox
              currency={toToken}
              isSelected={!fromTokenSelected}
              isFromToken={false}
              usdRate={toUSDRate}
              amount={toAmount}
              balance={toTokenBalance}
              handleAmountChange={handleToAmountChange}
              handleAssetSelect={(): void => setViewPairList('none')}
              handleFocused={(): void => setFromTokenSelected(false)}
              isLayout={false}
            />
          )}
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
        <SettingsCard slippage={slippage} setSlippage={setSlippage} chainId={chainId!} setChainId={setChainId} />
      </CardBody>
    </>
  )

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className='d-flex'>
          <AssetCardWrapper>{fromEntity && renderAssetCard(fromEntity)}</AssetCardWrapper>
          <TradePanel>
            {!viewSettings && (viewPairList === 'none' ? renderSwapPanel() : renderPairListPanel())}
            {viewSettings && renderSettingsPanel()}
          </TradePanel>
          <AssetCardWrapper>{toEntity && renderAssetCard(toEntity)}</AssetCardWrapper>
        </div>
      )}
      <SwapModal
        open={openTransactionModal}
        setOpen={setOpenTransactionModal}
        fromAsset={fromToken!}
        toAsset={toToken!}
        fromAmount={fromAmount}
      />
    </TradeWrapper>
  )
}
export default Swap
