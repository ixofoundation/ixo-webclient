import React, { useEffect, useMemo, useState } from 'react'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'

import OverlayButtonDownIcon from '/public/assets/images/modal/overlaybutton-down.svg'
import NextStepIcon from '/public/assets/images/modal/nextstep.svg'
import CheckIcon from '/public/assets/images/icon-check.svg'
import Ring from 'assets/icons/ring'

import { Container, NextStep, PrevStep, CheckWrapper, OverlayWrapper, Divider, LabelWrapper, Label } from '../styles'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { ModalInput, SignStep, SlippageSelector, SlippageType, TokenSelector, TXStatus } from '../common'
import { useAccount } from 'hooks/account'
import { Coin } from '@cosmjs/proto-signing'
import { GetBuyPrice, Buy, SetNextAlpha } from 'lib/protocol'
import { isLessThan, subtract, toFixed } from 'utils/currency'
import { useIxoConfigs } from 'hooks/configs'
import { useGetBondDid } from 'graphql/bonds'
import { useTheme } from 'styled-components'
import { NATIVE_DENOM } from 'constants/chains'
import BigNumber from 'bignumber.js'
import { useMapBondDetail } from 'hooks/bond'

interface Props {
  open: boolean
  bondDid: string
  setOpen: (open: boolean) => void
}

const BondBuyModal: React.FC<Props> = ({ open, bondDid, setOpen }): JSX.Element => {
  const theme: any = useTheme()
  const { convertToDenom, convertToMinimalDenom } = useIxoConfigs()
  const { displayBalances: balances, signingClient, did, address, updateBalances } = useAccount()
  const { data: bondDetail } = useGetBondDid(bondDid)
  const { publicAlpha, currentPrice } = useMapBondDetail(bondDetail)
  const steps = ['Bond', 'Amount', 'Order', 'Sign']
  const [currentStep, setCurrentStep] = useState<number>(0)

  const selectedCoin: Coin | undefined = useMemo(() => balances.find(({ denom }) => denom === NATIVE_DENOM), [balances])
  const bondToken: Coin | undefined = useMemo(
    () => (bondDetail ? { denom: bondDetail.token, amount: '0' } : undefined),
    [bondDetail],
  )
  const [slippage, setSlippage] = useState<SlippageType>(SlippageType.Ten)
  const [buyAmount, setBuyAmount] = useState<string>('')
  const [estPayPrice, setEstPayPrice] = useState<Coin | undefined>(undefined)
  const availableAmount = useMemo(() => {
    if (!bondDetail) {
      return '0'
    }
    return subtract(bondDetail.maxSupply?.amount ?? '0', bondDetail.currentSupply?.amount ?? '0')
  }, [bondDetail])

  const [txStatus, setTxStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [txHash, setTxHash] = useState<string>('')

  const showNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return !!estPayPrice && isLessThan(estPayPrice.amount, selectedCoin?.amount ?? '0')
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }, [currentStep, estPayPrice, selectedCoin])
  const showPrev = useMemo(() => {
    switch (currentStep) {
      case 0:
        return false
      case 1:
        return true
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }, [currentStep])

  const handleSubmit = async (): Promise<void> => {
    const maxPrice = convertToMinimalDenom(estPayPrice!)
    if (bondToken && buyAmount && maxPrice) {
      const amount = { amount: buyAmount, denom: bondToken.denom }
      const res = await Buy(signingClient, { did, address, bondDid, amount, maxPrice })
      if (res?.transactionHash) {
        setTxStatus(TXStatus.SUCCESS)
        setTxHash(res.transactionHash)

        // TODO: remove the code once tested
        const alpha = new BigNumber(publicAlpha).plus(0.01).multipliedBy(new BigNumber(10).pow(18)).toString()
        await SetNextAlpha(signingClient, { did, bondDid, address, alpha })
      } else {
        setTxStatus(TXStatus.ERROR)
        setTxHash('')
      }
    }
  }

  useEffect(() => {
    updateBalances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const run = async (buyAmount: string) => {
      if (!buyAmount) {
        setEstPayPrice(undefined)
        return
      }
      const res = await GetBuyPrice(bondDid, buyAmount)
      const price = res?.prices[0]
      setEstPayPrice(convertToDenom(price!))
    }
    run(buyAmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyAmount, bondDid])

  useEffect(() => {
    if (currentStep === 3) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Buy',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} />
        </div>

        {currentStep < 3 && (
          <div className='position-relative'>
            <CheckWrapper>
              <TokenSelector selectedToken={selectedCoin!} tokens={[selectedCoin!]} disabled className='mb-3' />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <CheckWrapper>
              <TokenSelector
                selectedToken={bondToken!}
                tokens={[bondToken!]}
                disabled
                icon={<Ring fill={theme.ixoNewBlue} />}
                customLabel={`MAX Available ${availableAmount}`}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <OverlayWrapper>
              <img src={OverlayButtonDownIcon} alt='down' />
            </OverlayWrapper>
          </div>
        )}

        {currentStep === 0 && (
          <>
            <div className='mt-3' />
            <SlippageSelector
              lastPrice={currentPrice!}
              slippage={slippage}
              handleChange={(newSlippage): void => setSlippage(newSlippage)}
            />
          </>
        )}

        {(currentStep === 1 || currentStep === 2) && (
          <>
            <Divider className='mt-3 mb-4' />
            <CheckWrapper>
              <ModalInput
                name='buy_amount'
                type='text'
                placeholder={`${bondToken?.denom.toUpperCase()} Amount`}
                value={buyAmount}
                onChange={(e): void => {
                  const value = e.target.value
                  if (!isNaN(+value)) {
                    setBuyAmount(value)
                  }
                }}
                disabled={currentStep !== 1}
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
            <LabelWrapper className='mt-2'>
              <Label>
                Network fees: <strong>0.005 IXO</strong>
              </Label>
              {buyAmount ? (
                <Label>
                  You will pay approx. {toFixed(estPayPrice?.amount, 3)} {estPayPrice?.denom.toUpperCase()}
                </Label>
              ) : (
                <Label>
                  Last Price was {toFixed(currentPrice?.amount, 3)} {currentPrice?.denom.toUpperCase()} per{' '}
                  {bondToken?.denom.toUpperCase()}
                </Label>
              )}
            </LabelWrapper>
          </>
        )}
        {currentStep === 3 && <SignStep status={txStatus} hash={txHash} />}

        <NextStep show={showNext} onClick={() => setCurrentStep(currentStep + 1)}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
        <PrevStep show={showPrev} onClick={() => setCurrentStep(currentStep - 1)}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default BondBuyModal
