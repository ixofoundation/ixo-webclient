import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'
import { ApiListedEntity } from 'api/blocksync/types/entities'

import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'
import { useParams } from 'react-router-dom'

import { findDenomByMinimalDenom, minimalAmountToAmount } from 'redux/account/account.utils'

import { selectSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.selectors'
import * as _ from 'lodash'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import SwapModal from 'components/ControlPanel/Actions/SwapModal'
import { calcToAmount } from 'redux/selectedEntityExchange/entityExchange.utils'
import { BlockSyncService } from 'services/blocksync'
import RenderSwapPanel from 'components/Pages/Exchange/Swap/RenderSwapPanel'
import RenderPairListPanel from 'components/Pages/Exchange/Swap/RenderPairListPanel'
import RenderSettingsPanel from 'components/Pages/Exchange/Swap/RenderSettingsPanel'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import * as keplr from 'lib/keplr/keplr'
import { setKeplrWallet } from 'redux/account/account.actions'
import { changeSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.actions'

const bsService = new BlockSyncService()

const Swap: React.FunctionComponent = () => {
  const { wallet } = useParams() as any
  const walletType = wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  //   const liquidityPools = useAppSelector(selectLiquidityPools)
  const dispatch = useAppDispatch()

  const [viewSettings, setViewSettings] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')
  const [fromUSDRate, setFromUSDRate] = useState(0)
  const [toUSDRate, setToUSDRate] = useState(0)
  const [fromToken, setFromToken] = useState<AssetType | undefined>(undefined)
  const [toToken, setToToken] = useState<AssetType | undefined>(undefined)
  const [fromAmount, setFromAmount] = useState<BigNumber>(new BigNumber(0))
  const [toAmount, setToAmount] = useState<BigNumber>(new BigNumber(0))
  const [fromEntity, setFromEntity] = useState<any | undefined>(undefined)
  const [toEntity, setToEntity] = useState<any | undefined>(undefined)
  const [balances, setBalances] = useState({})
  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)
  const [fromTokenSelected, setFromTokenSelected] = useState<boolean>(true)
  const [slippage] = useState<number>(3)

  const fromTokenBalance = useMemo(
    () => (fromToken?.display ? balances[fromToken.display] : '0'),
    [balances, fromToken],
  )
  const toTokenBalance = useMemo(() => (toToken?.display ? balances[toToken!.display!] : '0'), [balances, toToken])
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

  const canSubmit = useMemo<boolean>(() => {
    return Boolean(
      fromToken &&
        toToken &&
        new BigNumber(fromAmount).isGreaterThan(new BigNumber(0)) &&
        new BigNumber(toAmount).isGreaterThan(new BigNumber(0)) &&
        !swapError,
    )
  }, [fromToken, toToken, fromAmount, toAmount, swapError])

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
  //   const selectedPoolDetail = useMemo(() => {
  //     if (!liquidityPools) {
  //       return undefined
  //     }
  //     return liquidityPools.find((pool) =>
  //       _.difference(pool.poolDetail!.reserve_tokens, [fromToken?.base, toToken?.base]),
  //     )?.poolDetail
  //   }, [liquidityPools, fromToken, toToken])

  useEffect(() => {
    ;(async () => {
      switch (walletType) {
        case 'keplr': {
          const [accounts, offlineSigner] = await keplr.connectAccount()
          if (accounts) {
            dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
            dispatch(changeSelectedAccountAddress(accounts[0].address))
          }
          break
        }
        default:
          break
      }
    })()
  }, [walletType, dispatch])

  //   const panelHeight = '420px'

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

  //   useEffect(() => {
  //     if (!walletType || !selectedAccountAddress) {
  //       const { pathname } = history.location
  //       const chunks = pathname.split('/')
  //       chunks.pop()
  //       history.push(chunks.join('/'))
  //     }
  //     // eslint-disable-next-line
  //   }, [walletType, selectedAccountAddress])

  useEffect(() => {
    if (fromToken?.coingeckoId) {
      getUSDRateByCoingeckoId(fromToken?.coingeckoId).then((rate): void => setFromUSDRate(rate))
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
    }
    if (fromToken?.entityId) {
      bsService.entity?.getEntityById(fromToken?.entityId).then((apiEntity: ApiListedEntity) => {
        console.log({ apiEntity })
        setFromEntity(apiEntity)
      })
    }
  }, [fromToken, setFromAmount, setToAmount, setFromUSDRate])

  useEffect(() => {
    if (toToken?.coingeckoId) {
      getUSDRateByCoingeckoId(toToken?.coingeckoId).then((rate): void => setToUSDRate(rate))
      setFromAmount(new BigNumber(0))
      setToAmount(new BigNumber(0))
    }
    if (toToken?.entityId) {
      bsService.entity?.getEntityById(toToken?.entityId).then((apiEntity: ApiListedEntity) => {
        setToEntity(apiEntity)
      })
    }
  }, [toToken, setFromAmount, setToAmount, setFromUSDRate])

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

  console.log({ fromEntity })

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className='d-flex'>
          <AssetCardWrapper>
            {fromEntity && (
              <AssetCard
                id={'asset-card'}
                did={fromEntity?.id}
                name={fromEntity?.profile?.brand}
                logo={fromEntity?.profile?.logo}
                image={fromEntity?.profile?.image}
                sdgs={fromEntity?.sdgs}
                description={fromEntity?.profile?.description}
                dateCreated={moment(fromEntity?.metadata?.created)}
                badges={[]}
                version={''}
                termsType={TermsOfUseType.PayPerUse}
                isExplorer={false}
              />
            )}
          </AssetCardWrapper>
          <TradePanel>
            {!viewSettings &&
              (viewPairList === 'none' ? (
                <RenderSwapPanel
                  canSubmit={canSubmit}
                  fromAmount={fromAmount}
                  fromTokenBalance={fromTokenBalance}
                  fromTokenSelected={fromTokenSelected}
                  fromUSDRate={fromUSDRate}
                  fromToken={fromToken}
                  setFromToken={setFromToken}
                  setFromTokenSelected={setFromTokenSelected}
                  setToToken={setToToken}
                  setViewPairList={setViewPairList}
                  viewSettings={viewSettings}
                  setViewSettings={setViewSettings}
                  toAmount={toAmount}
                  handleToAmountChange={handleToAmountChange}
                  handleFromAmountChange={handleFromAmountChange}
                  handleSubmit={handleSubmit}
                  handleSwapClick={handleSwapClick}
                  swapError={swapError}
                  swapErrorMsg={swapErrorMsg}
                  networkName={networkName}
                  slippage={slippage}
                  toTokenBalance={toTokenBalance}
                  toUSDRate={toUSDRate}
                  toToken={toToken}
                />
              ) : (
                <RenderPairListPanel
                  fromAmount={fromAmount}
                  fromTokenBalance={fromTokenBalance}
                  fromTokenSelected={fromTokenSelected}
                  fromUSDRate={fromUSDRate}
                  fromToken={fromToken}
                  setFromToken={setFromToken}
                  setFromTokenSelected={setFromTokenSelected}
                  setToToken={setToToken}
                  setViewPairList={setViewPairList}
                  viewSettings={viewSettings}
                  setViewSettings={setViewSettings}
                  toAmount={toAmount}
                  handleToAmountChange={handleToAmountChange}
                  handleFromAmountChange={handleFromAmountChange}
                  toTokenBalance={toTokenBalance}
                  toUSDRate={toUSDRate}
                  toToken={toToken}
                  pairList={pairList}
                  viewPairList={viewPairList}
                  balances={balances}
                />
              ))}
            {viewSettings && (
              <RenderSettingsPanel
                setViewSettings={setViewSettings}
                viewSettings={viewSettings}
                chainId={chainId}
                setChainId={setChainId}
              />
            )}
          </TradePanel>
          <AssetCardWrapper>
            {toEntity && (
              <AssetCard
                id={'asset-card'}
                did={toEntity?.id}
                name={toEntity?.profile?.brand}
                logo={toEntity?.profile?.logo}
                image={toEntity?.profile?.image}
                sdgs={toEntity?.sdgs}
                description={toEntity?.profile?.description}
                dateCreated={moment(fromEntity?.metadata?.created)}
                badges={[]}
                version={''}
                termsType={TermsOfUseType.PayPerUse}
                isExplorer={false}
              />
            )}
          </AssetCardWrapper>
        </div>
      )}
      <SwapModal
        open={openTransactionModal}
        setOpen={setOpenTransactionModal}
        fromAsset={fromToken!}
        toAsset={toToken!}
        fromAmount={fromAmount}
        slippage={slippage}
      />
    </TradeWrapper>
  )
}

const mapStateToProps = (state: RootState): any => ({})
const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
