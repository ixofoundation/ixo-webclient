import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import AssetCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetCard'
import { TermsOfUseType } from 'modules/Entities/types'

import {
  SwapWrapper,
  CardBody,
  CardHeader,
  SettingsButton,
  SubmitButton,
  SwapButton,
  SwapPanel,
  AssetCardPanel,
  Stat,
} from './Swap.container.styles'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'

import {
  findDenomByMinimalDenom,
  minimalAmountToAmount,
} from 'modules/Account/Account.utils'

import SwapIcon from 'assets/images/exchange/swap.svg'
import SettingsIcon from 'assets/images/exchange/setting.svg'
import SettingsHighlightIcon from 'assets/images/exchange/setting-highlight.svg'
import { CurrencyType } from 'modules/Account/types'
import {
  selectLiquidityPools,
  // selectAvailablePairs,
  selectSelectedAccountAddress,
} from '../../EntityExchange.selectors'

import * as _ from 'lodash'
import { SettingsCard, PairListCard, AmountInputBox } from '../components'
import { getUSDRateByDenom } from 'utils'
import BigNumber from 'bignumber.js'

const Currencies = [
  {
    denom: 'ixo',
    minimalDenom: 'uixo',
    decimals: 6,
    imageUrl: require('assets/tokens/ixo.svg'),
  },
  {
    denom: 'osmosis',
    minimalDenom: 'uosmosis',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'xusd',
    minimalDenom: 'xusd',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'ixo1',
    minimalDenom: 'uixo1',
    decimals: 6,
    imageUrl: require('assets/tokens/ixo.svg'),
  },
  {
    denom: 'osmosis1',
    minimalDenom: 'uosmosis1',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
  {
    denom: 'xusd1',
    minimalDenom: 'xusd1',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
  },
]

const Swap: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const selectedAccountAddress = useSelector(selectSelectedAccountAddress)
  // const availablePairs = useSelector(selectAvailablePairs)
  const liquidityPools = useSelector(selectLiquidityPools)

  const [viewSettings, setViewSettings] = useState(false)

  // opens pair list dropdown
  const [viewPairList, setViewPairList] = useState<'none' | 'from' | 'to'>(
    'none',
  )

  const [fromUSDRate, setFromUSDRate] = useState(0)
  const [toUSDRate, setToUSDRate] = useState(0)

  const [fromToken, setFromToken] = useState<CurrencyType | undefined>(
    undefined,
  )
  const [toToken, setToToken] = useState<CurrencyType | undefined>(undefined)

  const [fromAmount, setFromAmount] = useState<BigNumber>(new BigNumber(0))
  const [toAmount, setToAmount] = useState<BigNumber>(new BigNumber(0))

  // balances currently purchased and stored in wallet
  const [balances, setBalances] = useState({})

  const fromTokenBalance = useMemo(() => balances[fromToken?.denom] ?? '0', [
    balances,
    fromToken,
  ])

  const toTokenBalance = useMemo(() => balances[toToken?.denom] ?? '0', [
    balances,
    toToken,
  ])

  // TODO: filter reserve amount available -> should not be first buy
  const pairList = useMemo<CurrencyType[]>(
    () =>
      Currencies
        // .filter((currency) =>
        //   availablePairs.some((pair) => currency.denom === pair),
        // )
        .filter(
          (currency) =>
            currency.denom !== fromToken?.denom &&
            currency.denom !== toToken?.denom,
        ),
    [
      fromToken,
      toToken,
      // availablePairs,
    ],
  )

  const [fromTokenSelected, setFromTokenSelected] = useState<boolean>(true)

  // slippage
  const [slippage, setSlippage] = useState<number>(3)
  // network TODO: should be fetched from exchange json
  const [network, setNetwork] = useState('Impact Hub')

  const selectedPoolDetail = useMemo(() => {
    if (!liquidityPools) {
      return undefined
    }
    return liquidityPools.find((pool) =>
      _.difference(pool.poolDetail.reserve_tokens, [
        fromToken?.minimalDenom,
        toToken?.minimalDenom,
      ]),
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
      const toAmount = new BigNumber(fromAmount)
        .multipliedBy(new BigNumber(fromUSDRate))
        .dividedBy(new BigNumber(toUSDRate))
      setToAmount(toAmount ?? new BigNumber(0))
    }
  }

  const handleToAmountChange = (value): void => {
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
      const fromAmount = new BigNumber(toAmount)
        .multipliedBy(new BigNumber(toUSDRate))
        .dividedBy(new BigNumber(fromUSDRate))
      setFromAmount(fromAmount ?? new BigNumber(0))
    }
  }

  // TODO: pre check validation true
  const handleSubmit = (): void => {
    console.log('handleSubmit')
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
      history.push(`/projects/${selectedEntity.did}/exchange/trade`)
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

  useEffect(() => {
    if (fromToken?.denom) {
      getUSDRateByDenom(fromToken?.denom).then((rate): void =>
        setFromUSDRate(rate),
      )
      setFromAmount(new BigNumber(0))
    }
  }, [fromToken])

  useEffect(() => {
    if (toToken?.denom) {
      getUSDRateByDenom(toToken?.denom).then((rate): void => setToUSDRate(rate))
      setToAmount(new BigNumber(0))
    }
  }, [toToken])

  const renderAssetCard = (): JSX.Element => (
    <>
      <CardHeader>&nbsp;</CardHeader>
      <AssetCard
        id={'asset-card'}
        did={selectedEntity.did}
        name={selectedEntity.name}
        logo={selectedEntity.logo}
        image={selectedEntity.image}
        sdgs={selectedEntity.sdgs}
        description={selectedEntity.description}
        dateCreated={selectedEntity.dateCreated}
        badges={[]}
        version={''}
        termsType={TermsOfUseType.PayPerUse}
        isExplorer={false}
      />
    </>
  )

  const renderSwapDetail = (): JSX.Element => (
    <>
      <SubmitButton className="mb-2" onClick={handleSubmit}>
        Review My Order
      </SubmitButton>
      <div className="px-2">
        <Stat className="mb-1">
          <span>Network:</span>
          <span>{network}</span>
        </Stat>
        <Stat className="mb-1">
          <span>Transaction Fee:</span>
          <span>0.33% (0.12 ATOM) ≈ $1.49</span>
        </Stat>
        <Stat className="mb-1">
          <span>Estimated Slippage:</span>
          <span>{slippage} %</span>
        </Stat>
      </div>
    </>
  )

  const renderSwapButton = (): JSX.Element => (
    <SwapButton
      className="d-flex justify-content-center align-itmes-center"
      onClick={handleSwapClick}
    >
      <img src={SwapIcon} alt="" />
    </SwapButton>
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

  const renderSwapPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <span>
          I want to&nbsp;<span className="highlight">Swap</span>
        </span>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={'auto'} className="mb-2">
        <div className="position-relative">
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
            className="mb-3"
          />
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

      <CardBody className="gap">{renderSwapDetail()}</CardBody>
    </>
  )

  const renderPairListPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <span>
          I want to&nbsp;<span className="highlight">Swap</span>
        </span>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={panelHeight}>
        <PairListCard
          pairList={pairList}
          balances={balances}
          viewPairList={viewPairList}
          handleClose={(): void => setViewPairList('none')}
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
        <span>Settings</span>
        {renderSettingsButton()}
      </CardHeader>
      <CardBody height={panelHeight}>
        <SettingsCard
          slippage={slippage}
          setSlippage={setSlippage}
          network={network}
          setNetwork={setNetwork}
        />
      </CardBody>
    </>
  )

  return selectedAccountAddress ? (
    <SwapWrapper>
      <div className="d-flex">
        <AssetCardPanel>{fromToken && renderAssetCard()}</AssetCardPanel>
        <SwapPanel>
          {!viewSettings &&
            (viewPairList === 'none'
              ? renderSwapPanel()
              : renderPairListPanel())}
          {viewSettings && renderSettingsPanel()}
        </SwapPanel>
        <AssetCardPanel>{toToken && renderAssetCard()}</AssetCardPanel>
      </div>
    </SwapWrapper>
  ) : null
}
export default Swap
