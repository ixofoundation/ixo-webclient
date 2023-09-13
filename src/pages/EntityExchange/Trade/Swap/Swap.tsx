import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'

import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'
import { useParams } from 'react-router-dom'

import { selectSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.selectors'
import * as _ from 'lodash'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import SwapModal from 'components/ControlPanel/Actions/SwapModal'
import RenderSwapPanel from 'components/Pages/Exchange/Swap/RenderSwapPanel'
import RenderPairListPanel from 'components/Pages/Exchange/Swap/RenderPairListPanel'
import RenderSettingsPanel from 'components/Pages/Exchange/Swap/RenderSettingsPanel'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import * as keplr from 'lib/keplr/keplr'
import { setKeplrWallet } from 'redux/account/account.actions'
import { changeSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.actions'
import useExchange from 'hooks/exchange'
import { setInputAsset, setInputAssetAmount, setOutputAsset } from 'redux/exchange/exchange.actions'

const Swap: React.FunctionComponent = () => {
  const { wallet } = useParams() as any
  const walletType = wallet
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  const dispatch = useAppDispatch()

  const [viewSettings, setViewSettings] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')
  const [fromUSDRate, setFromUSDRate] = useState(0)
  const [toUSDRate, setToUSDRate] = useState(0)
  const [fromToken, setFromToken] = useState<AssetType | undefined>(undefined)
  const [fromAmount, setFromAmount] = useState<BigNumber>(new BigNumber(0))
  const [fromTokenSelected, setFromTokenSelected] = useState<boolean>(true)

  const {
    balances,
    slippage,
    chainId,
    setChainId,
    swapError,
    swapErrorMsg,
    canSubmit,
    tokenBalances,
    inputAsset,
    outputAsset,
  } = useExchange({
    address: selectedAccountAddress as string,
    setOutputAsset,
    setInputAsset,
  })

  const assets = useMemo(() => getAssetsByChainId(chainId!), [getAssetsByChainId, chainId])

  const networkName = useMemo(() => getRelayerNameByChainId(chainId!), [getRelayerNameByChainId, chainId])

  const pairList = useMemo<AssetType[]>(
    () =>
      assets
        // .filter((currency) =>
        //   availablePairs.some((pair) => currency.denom === pair),
        // )
        .filter(
          (currency: any) =>
            currency.display !== inputAsset?.asset?.display && currency.display !== outputAsset?.asset?.display,
        ),
    [
      assets,
      inputAsset.asset,
      outputAsset.asset,
      // availablePairs,`
    ],
  )

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

  const handleSwapClick = (): void => {
    const temp = { ...inputAsset } // Create a copy of inputAsset
    dispatch(setInputAsset(outputAsset))
    dispatch(setOutputAsset(temp))
  }

  const handleFromAmountChange = (value: string | BigNumber) => {
    if (typeof value === 'string' && value.length === 0) {
      dispatch(setInputAssetAmount(BigNumber(0)))
    }
    if (typeof value === 'string' && value.length > 0) {
      dispatch(setInputAssetAmount(BigNumber(value)))
    }
  }

  const handleSubmit = (): void => {
    setOpenTransactionModal(true)
  }

  const handleInputTokenSelect = (token: AssetType) => {
    dispatch(
      setInputAsset({
        asset: token,
      }),
    )
  }

  const handleOutputTokenSelect = (token: AssetType) => {
    dispatch(
      setOutputAsset({
        asset: token,
      }),
    )
  }

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className='d-flex'>
          <AssetCardWrapper>
            {inputAsset.entity && (
              <AssetCard
                id={'asset-card'}
                did={inputAsset.entity?.id}
                name={inputAsset.entity?.profile?.brand}
                logo={inputAsset.entity?.profile?.logo}
                image={inputAsset.entity?.profile?.image}
                sdgs={inputAsset.entity?.sdgs}
                description={inputAsset.entity?.profile?.description}
                dateCreated={moment(inputAsset.entity?.metadata?.created)}
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
                  fromAmount={inputAsset.amount}
                  fromTokenBalance={inputAsset.balance}
                  fromTokenSelected={fromTokenSelected}
                  fromUSDRate={inputAsset.usdAmount?.toNumber() || 0}
                  fromToken={inputAsset.asset}
                  setFromToken={handleInputTokenSelect}
                  setFromTokenSelected={setFromTokenSelected}
                  setToToken={handleOutputTokenSelect}
                  setViewPairList={setViewPairList}
                  viewSettings={viewSettings}
                  setViewSettings={setViewSettings}
                  toAmount={outputAsset.amount}
                  handleFromAmountChange={handleFromAmountChange}
                  handleSubmit={handleSubmit}
                  handleSwapClick={handleSwapClick}
                  swapError={swapError}
                  swapErrorMsg={swapErrorMsg}
                  networkName={networkName}
                  slippage={slippage}
                  toTokenBalance={outputAsset.balance}
                  toUSDRate={toUSDRate}
                  toToken={outputAsset.asset}
                />
              ) : (
                <RenderPairListPanel
                  fromAmount={fromAmount}
                  fromTokenBalance={inputAsset.balance}
                  fromTokenSelected={fromTokenSelected}
                  fromUSDRate={fromUSDRate}
                  fromToken={fromToken}
                  setFromToken={handleInputTokenSelect}
                  setFromTokenSelected={setFromTokenSelected}
                  setToToken={handleOutputTokenSelect}
                  setViewPairList={setViewPairList}
                  viewSettings={viewSettings}
                  setViewSettings={setViewSettings}
                  toAmount={outputAsset.amount}
                  handleFromAmountChange={handleFromAmountChange}
                  toTokenBalance={outputAsset.balance}
                  toUSDRate={toUSDRate}
                  toToken={outputAsset.asset}
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
            {outputAsset.entity && (
              <AssetCard
                id={'asset-card'}
                did={outputAsset.entity?.id}
                name={outputAsset.entity?.profile?.brand}
                logo={outputAsset.entity?.profile?.logo}
                image={outputAsset.entity?.profile?.image}
                sdgs={outputAsset.entity?.sdgs}
                description={outputAsset.entity?.profile?.description}
                dateCreated={moment(outputAsset.entity?.metadata?.created)}
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
        fromAsset={inputAsset.asset!}
        toAsset={outputAsset.asset!}
        fromAmount={inputAsset.amount}
        toAmount={outputAsset.amount}
        slippage={slippage}
        inputAsset={inputAsset}
        outputAsset={outputAsset}
        tokenBalances={tokenBalances}
      />
    </TradeWrapper>
  )
}

const mapStateToProps = (state: RootState): any => ({})
const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
