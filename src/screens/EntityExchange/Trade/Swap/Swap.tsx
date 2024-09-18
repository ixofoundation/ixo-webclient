import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

import { TradePanel } from '../Trade.styles'

import BigNumber from 'bignumber.js'
import { useIxoConfigs } from 'hooks/configs'
import { AssetType } from 'redux/configs/configs.types'
import SwapModal from 'components/ControlPanel/Actions/SwapModal'
import RenderSwapPanel from 'components/Sections/Exchange/Swap/RenderSwapPanel'
import RenderPairListPanel from 'components/Sections/Exchange/Swap/RenderPairListPanel'
import RenderSettingsPanel from 'components/Sections/Exchange/Swap/RenderSettingsPanel'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import useExchange from 'hooks/exchange'
import { setInputAsset, setInputAssetAmount, setOutputAsset } from 'redux/exchange/exchange.actions'
import { selectInputEntity, selectOutputEntity } from 'redux/exchange/exchange.selectors'
import { AssetCard } from 'components'
import { Flex } from '@mantine/core'
import { useGetAccountTokens } from 'graphql/tokens'
import { useMediaQuery } from '@mantine/hooks'
import { useAccount } from 'hooks/account'
import { useTheme } from 'styled-components'

const EmptyAssetCardData = {
  type: '',
  logo: '',
  collectionName: '',
  title: '',
  cardImage: '',
  creator: '',
  tags: '',
  animation: '',
  assetNumber: '',
  maxSupply: '',
  accountTokens: {},
}

const Swap: React.FunctionComponent = () => {
  const { getAssetsByChainId, getRelayerNameByChainId } = useIxoConfigs()
  const { address: selectedAccountAddress } = useAccount()
  const inputAssetEntity = useAppSelector(selectInputEntity)
  const outputAssetEntity = useAppSelector(selectOutputEntity)
  const dispatch = useAppDispatch()
  const isSmallScreen = useMediaQuery('(max-width: 1024px)')
  const theme = useTheme() as any

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
    [assets, inputAsset.asset, outputAsset.asset],
  )

  const handleSwapClick = (): void => {
    const temp = { ...inputAsset }
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
    getInputAssetEntity(token.entityId)
    dispatch(
      setInputAsset({
        asset: token,
      }),
    )
  }

  const handleOutputTokenSelect = (token: AssetType) => {
    getOutputAssetEntity(token.entityId)
    dispatch(
      setOutputAsset({
        asset: token,
      }),
    )
  }

  const inputAssetCardData = useMemo(() => {
    if (inputAssetEntity) {
      const {
        settings: { Profile, Tags },
        linkedResource,
      } = inputAssetEntity
      const {
        data: { name, image, logo, type, brand },
      } = Profile
      const zLottie = linkedResource.find((resource: any) => resource.type === 'Lottie').data

      return {
        logo,
        type: type.split(':')[1],
        collectionName: name,
        title: brand,
        cardImage: image,
        creator: '',
        tags: Tags.data.entityTags,
        animation: zLottie,
        assetNumber: '',
        maxSupply: '',
        accountTokens: {},
      }
    }
    return EmptyAssetCardData
  }, [inputAssetEntity])

  const outputAssetCardData = useMemo(() => {
    if (outputAssetEntity) {
      const {
        settings: { Profile, Tags },
        linkedResource,
      } = outputAssetEntity
      const {
        data: { name, image, logo, type, brand },
      } = Profile
      const zLottie = linkedResource?.find((resource: any) => resource.type === 'Lottie').data

      return {
        logo,
        type: type.split(':')[1],
        collectionName: name,
        title: brand,
        cardImage: image,
        creator: '',
        tags: Tags.data.entityTags,
        animation: zLottie,
        assetNumber: '',
        maxSupply: '',
        accountTokens: {},
      }
    }
    return EmptyAssetCardData
  }, [outputAssetEntity])

  const adminAccount = useMemo(
    () => inputAssetEntity?.accounts?.find((v: any) => v.name === 'admin')?.address || '',
    [inputAssetEntity],
  )
  const { data: accountTokens } = useGetAccountTokens(adminAccount)

  const carbonTokens = useMemo(() => {
    if (accountTokens['CARBON']) {
      const carbon = accountTokens['CARBON']
      const claimable = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.amount, 0)
      const produced = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.minted, 0)
      const retired = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.retired, 0)
      return { retired, produced, claimable }
    }

    return { retired: 0, produced: 0, claimable: 0 }
  }, [accountTokens])

  const hasInputData = Boolean(inputAssetCardData.type.length > 0)
  const hasOutputData = Boolean(outputAssetCardData.type.length > 0)

  return (
    <Flex w='100%' bg={theme.ixoDarkestBlue}>
      <Flex align='center' justify={hasInputData ? 'flex-start' : 'center'} w='100%'>
        <Flex h='300px' mx={30} w={isSmallScreen ? '10%' : '30%'} justify='flex-end'>
          {!isSmallScreen && hasInputData && (
            <AssetCard {...inputAssetCardData} accountTokens={carbonTokens} width='250px' height='100%' />
          )}
        </Flex>
        <TradePanel width={isSmallScreen ? '100%' : '40%'}>
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
        <Flex h='300px' mx={30} w={isSmallScreen ? '10%' : '30%'} justify='flex-start'>
          {!isSmallScreen && hasOutputData && (
            <AssetCard {...outputAssetCardData} accountTokens={carbonTokens} width='250px' height='100%' />
          )}
        </Flex>
      </Flex>

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
    </Flex>
  )
}

const mapStateToProps = (state: RootState): any => ({})
const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Swap)
