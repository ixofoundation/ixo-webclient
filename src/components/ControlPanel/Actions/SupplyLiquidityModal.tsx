/* eslint @typescript-eslint/no-unused-vars: 0 */
import React, { useEffect, useState, useMemo } from 'react'
import cx from 'classnames'
import BigNumber from 'bignumber.js'
import PoolSelector from 'components/Pool/PoolSelector'
import PoolInfo from 'components/Pool/PoolInfo'
import LiquidityAmount from 'components/LiquidityAmount/LiquidityAmount'
import CheckIcon from 'assets/images/icon-check.svg'
import AirdropIcon from 'assets/images/exchange/airdrop.svg'
import ArrowUpDownIcon from 'assets/images/exchange/arrow-updown.svg'
import { thousandSeparator } from 'utils/formatters'
import { useAppSelector } from 'redux/hooks'
import { selectLiquidityPools } from 'redux/selectedEntityExchange/entityExchange.selectors'
import { findDenomByMinimalDenom, minimalDenomToDenom } from 'redux/account/account.utils'
import SignStep, { TXStatus } from './components/SignStep'
import { CheckWrapper, Container } from './Modal.styles'

interface Props {
  walletType: string
  accountAddress: string
  bondDid: string
}

const SupplyLiquidityModal: React.FunctionComponent<Props> = ({
  // walletType,
  // accountAddress,
  bondDid,
}) => {
  const steps = ['Pool', 'Amount', 'Confirm', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)

  // TODO: placeholder now
  const [APR] = useState(0.67)

  // TODO: BigNumber right behavior? this is coming from the correct denom for `xusd`
  const [amounts, setAmounts] = useState<BigNumber[]>([new BigNumber(0), new BigNumber(0)])
  const [validations, setValidations] = useState([false, false])
  const [bondAmount, setBondAmount] = useState<BigNumber>(new BigNumber(0))

  const [signTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash] = useState<string | null>(null)

  const liquidityPools = useAppSelector(selectLiquidityPools)

  // TODO: usdRate is for just `ixo` but may need to change for all asset types
  const { userInfo, usdRate } = useAppSelector((state) => state.account)

  const selectedPoolDetail = useMemo(() => {
    if (!bondDid) {
      return undefined
    }
    return (liquidityPools! as any[]).find((pool: any) => pool.poolID === bondDid)?.poolDetail ?? undefined
  }, [liquidityPools, bondDid])

  console.log('selectedPoolDetail', selectedPoolDetail)

  const bondDenom = useMemo(() => selectedPoolDetail?.token ?? undefined, [selectedPoolDetail])

  const denoms = useMemo(
    () => selectedPoolDetail?.reserve_tokens.map((token: any) => findDenomByMinimalDenom(token)) ?? [],
    [selectedPoolDetail],
  )

  const firstBuy = useMemo(() => selectedPoolDetail?.current_reserve.length === 0, [selectedPoolDetail])

  // calculation: $ Liquidity =  (IXO Price)*(IXO Reserve QUANTITY + XUSD Reserve QUANTITY)
  const liquidityPrice = useMemo(() => {
    if (selectedPoolDetail) {
      const { current_reserve } = selectedPoolDetail
      if (current_reserve.length > 0) {
        const sumOfReserves = current_reserve
          .map((reserve: any) => minimalDenomToDenom(reserve.denom, reserve.amount))
          .reduce((ac: any, next: any) => ac + next, 0)
        return sumOfReserves * usdRate
      }
    }
    return 0
  }, [usdRate, selectedPoolDetail])

  const sanityRateRange = useMemo(() => {
    if (selectedPoolDetail && selectedPoolDetail.sanity_rate && selectedPoolDetail.sanity_margin_percentage) {
      const minSanityRate =
        (100 - Number(selectedPoolDetail.sanity_margin_percentage)) * Number(selectedPoolDetail.sanity_rate)
      const maxSanityRate =
        (100 + Number(selectedPoolDetail.sanity_margin_percentage)) * Number(selectedPoolDetail.sanity_rate)
      return [minSanityRate, maxSanityRate]
    }
    return [0, 0]
  }, [selectedPoolDetail])

  console.log('sanityRateRange', sanityRateRange)

  const reserveRatio = useMemo(() => {
    if (selectedPoolDetail && selectedPoolDetail.current_reserve && selectedPoolDetail.current_reserve.length > 0) {
      const firstReserveToken = selectedPoolDetail.current_reserve[0]
      const secondReserveToken = selectedPoolDetail.current_reserve[1]

      const firstReserveAmount = minimalDenomToDenom(firstReserveToken.denom, firstReserveToken.amount)
      const secondReserveAmount = minimalDenomToDenom(secondReserveToken.denom, secondReserveToken.amount)
      return new BigNumber(firstReserveAmount).dividedBy(secondReserveAmount)
    }
    return new BigNumber(0)
  }, [selectedPoolDetail])

  // current bond supply from bondDid
  const currentSupply = useMemo(() => {
    if (selectedPoolDetail) {
      const { current_supply } = selectedPoolDetail
      if (current_supply) {
        const { amount } = current_supply
        return amount
      }
    }
    return 0
  }, [selectedPoolDetail])

  // limits
  const orderQuantityLimits = useMemo(() => {
    if (selectedPoolDetail) {
      const { order_quantity_limits } = selectedPoolDetail
      if (order_quantity_limits.length > 0) {
        return order_quantity_limits.map(({ amount, denom }: any) => minimalDenomToDenom(denom, amount))
      }
    }
    return [0, 0]
  }, [selectedPoolDetail])

  // methods

  const handleReserveAmountChange = (tokenIdx: any, amount: any): void => {
    let newAmounts: any[] = []
    if (firstBuy) {
      if (tokenIdx === 0) {
        newAmounts = [amount, amounts[1]]
      } else if (tokenIdx === 1) {
        newAmounts = [amounts[0], amount]
      }
    } else if (!firstBuy) {
      //  Supply a liquidity
      if (tokenIdx === 0) {
        const pairedAmount = new BigNumber(amount).dividedBy(reserveRatio)
        newAmounts = [amount, pairedAmount]
      } else if (tokenIdx === 1) {
        const pairedAmount = new BigNumber(amount).multipliedBy(reserveRatio)
        newAmounts = [pairedAmount, amount]
      }
    }
    setAmounts(newAmounts)

    // if order_quantity_limits doesn't exist, then return and no validation checker
    if (!orderQuantityLimits[0] && !orderQuantityLimits[1]) {
      return
    }
    if (new BigNumber(newAmounts[0]).isGreaterThan(new BigNumber(orderQuantityLimits[0]))) {
      setValidations((pre) => [true, pre[1]])
    } else {
      setValidations((pre) => [false, pre[1]])
    }
    if (new BigNumber(newAmounts[1]).isGreaterThan(new BigNumber(orderQuantityLimits[1]))) {
      setValidations((pre) => [pre[0], true])
    } else {
      setValidations((pre) => [pre[0], false])
    }
  }

  useEffect(() => {
    console.log('validations', validations)
  }, [validations])

  // const handlePrevStep = (): void => {
  //   setCurrentStep(currentStep - 1)
  // }
  // const handleNextStep = async (): Promise<void> => {
  //   setCurrentStep(currentStep + 1)
  // }

  const handleSubmit = (): void => {
    // const msgs = []
    // const memo = ''
    // const fee = {
    //   amount: [{ amount: String(5000), denom: 'uixo' }],
    //   gas: String(200000),
    // }
    // msgs.push({
    //   type: 'bonds/MsgBuy',
    //   value: {
    //     buyer_did: userInfo.didDoc.did,
    //     bond_did: bondDid,
    //     amount: {
    //       amount: bondAmount,
    //       denom: bondDenom,
    //     },
    //     max_prices: [
    //       {
    //         amount: denomToMinimalDenom(denoms[0], amounts[0].toString()),
    //         denom: findMinimalDenomByDenom(denoms[0]),
    //       },
    //       {
    //         amount: denomToMinimalDenom(denoms[1], amounts[1].toString()),
    //         denom: findMinimalDenomByDenom(denoms[1]),
    //       },
    //     ],
    //   },
    // })
  }

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      //  last step
      handleSubmit()
    }
    // eslint-disable-next-line
  }, [currentStep])

  // second+ buy: bond amount calculation
  useEffect(() => {
    if (!firstBuy) {
      const amount = new BigNumber(currentSupply).dividedBy(new BigNumber(amounts[0]).plus(amounts[1]))
      setBondAmount(amount)
    }
    // eslint-disable-next-line
  }, [amounts])

  const enableNextStep = (): boolean => {
    if (currentStep === 0) return true
    else if (
      currentStep === 1 &&
      new BigNumber(amounts[0]).isGreaterThan(new BigNumber(0)) &&
      new BigNumber(amounts[1]).isGreaterThan(new BigNumber(0)) &&
      ((firstBuy && new BigNumber(bondAmount).isGreaterThan(new BigNumber(0))) || !firstBuy)
    )
      return true
    else if (currentStep === 2) return true
    return false
  }
  // const enablePrevStep = (): boolean => {
  //   return currentStep > 0 && currentStep < 3
  // }

  const renderPoolInfoRow = (): JSX.Element =>
    currentStep < 3 ? (
      <>
        <CheckWrapper className='mb-3'>
          <PoolSelector
            label={bondDid.toUpperCase().substring(0, 14) + '...'}
            logo={AirdropIcon}
            placeholder={selectedPoolDetail?.name}
            border={currentStep === 0}
          />
          {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
        </CheckWrapper>
        <CheckWrapper className='mb-3'>
          <PoolInfo
            label={`$${thousandSeparator(liquidityPrice.toFixed(0), ',')} Liquidity | <span>${(APR * 100).toFixed(
              0,
            )}% APR</span>`}
            logo={ArrowUpDownIcon}
            placeholder={denoms.join('/')}
            border={currentStep === 0}
          />
          {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
        </CheckWrapper>
      </>
    ) : (
      <div />
    )
  const renderAmountInputRow = (): JSX.Element =>
    currentStep === 1 || currentStep === 2 ? (
      <CheckWrapper
        className={cx('d-flex', 'justify-content-between', 'mb-3', {
          'pe-none': currentStep === 2,
        })}
      >
        <LiquidityAmount
          amount={amounts[0]}
          denom={denoms[0]}
          setAmount={(amount): void => handleReserveAmountChange(0, amount)}
          disable={currentStep !== 1}
          error={validations[0]}
        />
        <LiquidityAmount
          amount={amounts[1]}
          denom={denoms[1]}
          setAmount={(amount): void => handleReserveAmountChange(1, amount)}
          disable={currentStep !== 1}
          error={validations[1]}
        />

        {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
      </CheckWrapper>
    ) : (
      <div />
    )

  const renderBondAmountInputRow = (): JSX.Element =>
    (currentStep === 1 || currentStep === 2) && firstBuy ? (
      <CheckWrapper
        className={cx('d-flex', 'justify-content-center', {
          'pe-none': currentStep === 2,
        })}
      >
        <LiquidityAmount
          amount={bondAmount}
          denom={bondDenom}
          setAmount={(amount): void => setBondAmount(amount)}
          disable={currentStep !== 1}
        />

        {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
      </CheckWrapper>
    ) : (
      <div />
    )

  const renderSignStep = (): JSX.Element =>
    currentStep === 3 ? <SignStep status={signTXStatus} hash={signTXhash!} /> : <div />

  if (!selectedPoolDetail) {
    return <Container></Container>
  }
  return <div />
}

export default SupplyLiquidityModal
