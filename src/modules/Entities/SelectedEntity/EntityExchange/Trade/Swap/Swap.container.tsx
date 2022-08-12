import React, { useEffect, useMemo, useRef, useState } from 'react'
import Axios from 'axios'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import AssetNewCard from 'modules/Entities/EntitiesExplorer/components/EntityCard/AssetCard/AssetNewCard'
import { TermsOfUseType } from 'modules/Entities/types'

import {
  CardBody,
  CardHeader,
  PurchaseBox,
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
  minimalDenomToDenom,
} from 'modules/Account/Account.utils'

import SwapIcon from 'assets/images/exchange/swap.svg'
import SettingsIcon from 'assets/images/exchange/setting.svg'
import SettingsHighlightIcon from 'assets/images/exchange/setting-highlight.svg'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'
import { CurrencyType } from 'modules/Account/types'
import {
  selectLiquidityPools,
  selectAvailablePairs,
  selectSelectedAccountAddress,
} from '../../EntityExchange.selectors'

import * as _ from 'lodash'
import {
  currencyFormatter,
  displayTokenAmount,
} from 'common/utils/currency.utils'
import { SettingsCard, PairListCard } from '../components'

const decimals = 3
const Currencies = [
  {
    denom: 'ixo',
    minimalDenom: 'uixo',
    decimals: 6,
    imageUrl: require('assets/tokens/ixo.svg'),
    usdRate: 0.05,
    balance: 0,
  },
  {
    denom: 'osmo',
    minimalDenom: 'uosmo',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
    usdRate: 2.09,
    balance: 0,
  },
  {
    denom: 'xusd',
    minimalDenom: 'xusd',
    decimals: 6,
    imageUrl: require('assets/tokens/osmo.svg'),
    usdRate: 1.01,
    balance: 0,
  },
]

const Swap: React.FunctionComponent = () => {
  const { search } = useLocation()
  const history = useHistory()
  const walletType = queryString.parse(search)?.wallet
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const selectedAccountAddress = useSelector(selectSelectedAccountAddress)
  const availablePairs = useSelector(selectAvailablePairs)
  const liquidityPools = useSelector(selectLiquidityPools)

  const fromAmountRef = useRef<HTMLInputElement>(undefined)
  const toAmountRef = useRef<HTMLInputElement>(undefined)

  // toggle panel `slippage tolerance` <-> `Est. Receive Amount`
  const [viewSettings, setViewSettings] = useState(false)

  // opens pair list dropdown
  const [viewPairList, setViewPairList] = useState(0)

  // TODO: supposed we have uixo, xusd pair as a default
  const [fromToken, setFromToken] = useState<CurrencyType>(Currencies[0])
  const [toToken, setToToken] = useState<CurrencyType>(Currencies[1])

  const [fromAmount, setFromAmount] = useState<number>(0)
  const [toAmount, setToAmount] = useState<number>(0)

  const [fromUSD, toUSD] = useMemo(() => {
    return [fromToken.usdRate * fromAmount, toToken.usdRate * toAmount]
  }, [fromAmount, toAmount, fromToken, toToken])

  // balances currently purchased and stored in wallet
  const [balances, setBalances] = useState({})
  const fromTokenBalance = useMemo(() => balances[fromToken.denom] ?? 0, [
    balances,
    fromToken,
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
            currency.denom !== fromToken.denom &&
            currency.denom !== toToken.denom,
        ),
    [
      fromToken,
      toToken,
      // availablePairs,
    ],
  )

  const [fromTokenSelected, setFromTokenSelected] = useState<boolean>(true)

  // slippage, gasPrice
  const [slippage, setSlippage] = useState(3)
  const [gasPrice, setGasPrice] = useState(0.05)

  const selectedPoolDetail = useMemo(() => {
    if (!liquidityPools) {
      return undefined
    }
    return liquidityPools.find((pool) =>
      _.difference(pool.poolDetail.reserve_tokens, [
        fromToken.minimalDenom,
        toToken.minimalDenom,
      ]),
    )?.poolDetail
  }, [liquidityPools, fromToken, toToken])

  console.log('selectedPoolDetail', selectedPoolDetail)

  const [panelHeight, setPanelHeight] = useState('auto')
  useEffect(() => {
    if (selectedAccountAddress) {
      const assetCardDOM: any = document.querySelector('#asset-card')
      const assetCardStyle: any = window.getComputedStyle
        ? getComputedStyle(assetCardDOM, null)
        : assetCardDOM.currentStyle
      setPanelHeight(assetCardStyle.height)
    } else {
      setPanelHeight('auto')
    }
  }, [selectedAccountAddress])

  const handleSwapClick = (): void => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromAmountChange = (value): void => {
    if (!value) {
      setFromAmount(0)
      setToAmount(0)
      return
    }

    const amount = Number(value)
    setFromAmount(
      Math.trunc(amount * Math.pow(10, decimals)) / Math.pow(10, decimals),
    )
    setToAmount(
      Number(
        ((amount * fromToken.usdRate) / toToken.usdRate).toFixed(decimals),
      ),
    )
  }

  const handleToAmountChange = (value): void => {
    if (!value) {
      setFromAmount(0)
      setToAmount(0)
      return
    }
    const amount = Number(value)
    setToAmount(amount)
    setFromAmount(
      Number(
        ((amount * toToken.usdRate) / fromToken.usdRate).toFixed(decimals),
      ),
    )
  }

  const handleViewPairList = (fromOrTo): void => {
    setViewPairList(fromOrTo)
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
            amount: minimalDenomToDenom(denom, amount),
          })),
        )
        .then((response) => _.mapValues(_.keyBy(response, 'denom'), 'amount'))
        .then((response) => setBalances(response))
        .catch((e) => {
          console.error(e)
          setBalances({})
        })
    }
  }, [selectedAccountAddress, fromToken])

  useEffect(() => {
    if (!walletType || !selectedAccountAddress) {
      history.push(`/projects/${selectedEntity.did}/exchange/trade`)
    }
    // eslint-disable-next-line
  }, [walletType, selectedAccountAddress])

  const renderAssetCard = (): JSX.Element => (
    <>
      <CardHeader>Asset</CardHeader>
      <AssetNewCard
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

  const renderFromToken = (): JSX.Element => (
    <PurchaseBox
      hasBorder={fromTokenSelected}
      onClick={(): void => {
        setFromTokenSelected(true)
        if (fromAmountRef.current) {
          fromAmountRef.current?.focus()
        }
      }}
    >
      <img className="mr-3" src={fromToken.imageUrl} alt={fromToken.denom} />
      <div className="d-inline-flex flex-column">
        <div className="d-flex align-items-center mb-1">
          <input
            ref={fromAmountRef}
            className="token-amount"
            type={fromAmount === 0 ? 'string' : 'number'}
            value={fromAmount === 0 ? '' : fromAmount}
            placeholder="Amount"
            onChange={(e): void => handleFromAmountChange(e.target.value)}
          />
        </div>
        {fromUSD > 0 && (
          <span className="usd-label">{currencyFormatter(fromUSD, 2)}</span>
        )}
      </div>
      <div
        className={cx('indicator', { reverse: viewPairList })}
        onClick={(): void => handleViewPairList(1)}
      >
        <img src={ChevDownIcon} alt="" />
      </div>
      <div
        className="max-amount"
        onClick={(): void => handleFromAmountChange(fromTokenBalance)}
      >
        <span>
          {displayTokenAmount(fromTokenBalance)} {fromToken.denom.toUpperCase()}{' '}
          Max
        </span>
      </div>
      {fromTokenSelected && <div className="triangle-left" />}
    </PurchaseBox>
  )

  const renderToToken = (): JSX.Element => (
    <PurchaseBox
      className="mt-2 position-relative"
      hasBorder={!fromTokenSelected}
      onClick={(): void => {
        setFromTokenSelected(false)
        if (toAmountRef.current) {
          toAmountRef.current?.focus()
        }
      }}
    >
      <img className="mr-3" src={toToken.imageUrl} alt={toToken.denom} />
      <div className="d-inline-flex flex-column">
        <div className="d-flex align-items-center mb-1">
          <input
            ref={toAmountRef}
            className="token-amount"
            type={toAmount === 0 ? 'string' : 'number'}
            value={toAmount === 0 ? '' : toAmount}
            placeholder="Amount"
            onChange={(e): void => handleToAmountChange(e.target.value)}
          />
        </div>
        {toUSD > 0 && (
          <span className="usd-label">{currencyFormatter(toUSD, 2)}</span>
        )}
      </div>
      <div
        className={cx('indicator', { reverse: viewPairList })}
        onClick={(): void => handleViewPairList(2)}
      >
        <img src={ChevDownIcon} alt="" />
      </div>
      {!fromTokenSelected && <div className="triangle-right" />}
    </PurchaseBox>
  )

  const renderSwapButton = (): JSX.Element => (
    <SwapButton
      className="d-flex justify-content-center align-itmes-center"
      onClick={handleSwapClick}
    >
      <img src={SwapIcon} alt="swap button" />
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
          {renderFromToken()}
          {renderToToken()}
          {renderSwapButton()}
        </div>
      </CardBody>

      <CardBody className="gap">
        <SubmitButton className="mb-2" onClick={handleSubmit}>
          Review My Order
        </SubmitButton>
        <Stat>
          <span>Network:</span>
          <span>Osmosis</span>
        </Stat>
        <Stat>
          <span>Fee:</span>
          <span>0.005 IXO</span>
        </Stat>
      </CardBody>
    </>
  )

  const renderPairListPanel = (): JSX.Element => (
    <>
      <CardHeader>
        <span>Select Token</span>
      </CardHeader>
      <CardBody height={panelHeight}>
        <PairListCard
          pairList={pairList}
          handleClose={(): void => setViewPairList(0)}
          handleSelectToken={(currency): void => {
            setViewPairList(0)
            if (viewPairList === 1) {
              setFromToken(currency)
            } else if (viewPairList === 2) {
              setToToken(currency)
            }
          }}
        />
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
          gasPrice={gasPrice}
          setSlippage={setSlippage}
          setGasPrice={setGasPrice}
        />
      </CardBody>
    </>
  )

  return selectedAccountAddress ? (
    <div className="d-flex">
      <AssetCardPanel>{renderAssetCard()}</AssetCardPanel>
      <SwapPanel>
        {!viewSettings &&
          (viewPairList === 0 ? renderSwapPanel() : renderPairListPanel())}
        {viewSettings && renderSettingsPanel()}
      </SwapPanel>
      <AssetCardPanel>{renderAssetCard()}</AssetCardPanel>
    </div>
  ) : null
}
export default Swap
