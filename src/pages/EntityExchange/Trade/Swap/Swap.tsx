import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import AssetCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'types/entities'

import { TradeWrapper, AssetCardWrapper, TradePanel } from '../Swap.styles'

import { selectSelectedAccountAddress } from 'redux/selectedEntityExchange/entityExchange.selectors'
import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import SwapModal from 'components/ControlPanel/Actions/SwapModal'
import RenderSwapPanel from 'components/Pages/Exchange/Swap/RenderSwapPanel'
import RenderPairListPanel from 'components/Pages/Exchange/Swap/RenderPairListPanel'
import RenderSettingsPanel from 'components/Pages/Exchange/Swap/RenderSettingsPanel'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import useExchange from 'hooks/exchange'
import { setInputAsset, setInputAssetAmount, setOutputAsset } from 'redux/exchange/exchange.actions'
import { selectInputEntity, selectOutputEntity } from 'redux/exchange/exchange.selectors'

const Swap: React.FunctionComponent = () => {
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const selectedAccountAddress = useAppSelector(selectSelectedAccountAddress)
  const inputAssetEntity = useAppSelector(selectInputEntity)
  const outputAssetEntity = useAppSelector(selectOutputEntity)
  const dispatch = useAppDispatch()

  const [viewSettings, setViewSettings] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>('none')
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
    getInputAssetEntity,
    getOutputAssetEntity,
  } = useExchange({
    address: selectedAccountAddress as string,
    setOutputAsset,
    setInputAsset,
  })

  const assets = useMemo(() => getAssetsByChainId(chainId!), [getAssetsByChainId, chainId])

  const networkName = useMemo(() => getRelayerNameByChainId(chainId!), [getRelayerNameByChainId, chainId])

  const pairList = useMemo<AssetType[]>(
    () =>
      assets.filter(
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
    console.log('Entity ID', token.entityId)
    getInputAssetEntity(token.entityId)
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
    getOutputAssetEntity(token.entityId)
  }

  return (
    <TradeWrapper>
      {selectedAccountAddress && (
        <div className='d-flex'>
          <AssetCardWrapper>
            {inputAssetEntity && (
              <AssetCard
                id={'asset-card'}
                did={inputAssetEntity?.id}
                name={inputAssetEntity?.profile?.brand}
                logo={inputAssetEntity?.profile?.logo}
                image={inputAssetEntity?.profile?.image}
                sdgs={inputAssetEntity?.sdgs}
                description={inputAssetEntity?.profile?.description}
                dateCreated={moment(inputAssetEntity?.metadata?.created)}
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
                  toUSDRate={outputAsset.usdAmount?.toNumber() || 0}
                  toToken={outputAsset.asset}
                />
              ) : (
                <RenderPairListPanel
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
                  toTokenBalance={outputAsset.balance}
                  toUSDRate={outputAsset.usdAmount?.toNumber() || 0}
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
            {outputAssetEntity && (
              <AssetCard
                id={'asset-card'}
                did={outputAssetEntity?.id}
                name={outputAssetEntity?.profile?.brand}
                logo={outputAssetEntity?.profile?.logo}
                image={outputAssetEntity?.profile?.image}
                sdgs={outputAssetEntity?.sdgs}
                description={outputAssetEntity?.profile?.description}
                dateCreated={moment(outputAssetEntity?.metadata?.created)}
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
