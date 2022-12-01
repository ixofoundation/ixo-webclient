import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import { Container, NextStep, OverlayDiv } from './Modal.styles'
import { AssetType } from 'redux/configs/configs.types'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import { getUSDRateByCoingeckoId } from 'utils'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import BigNumber from 'bignumber.js'
import { calcToAmount } from 'redux/selectedEntityExchange/entityExchange.utils'
import { displayTokenAmount } from 'utils/currency'
import SignStep, { TXStatus } from './components/SignStep'
import CashIcon from 'assets/images/assets/cash.svg'
import CircleCheckoutStep from './components/CircleCheckoutStep'

const NftBuyPanel = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: auto 3rem;
`
const NftBuyInput = styled.div`
  border: 0.5px solid ${(props): string => props.theme.ixoBlue}88;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #ffffff;
`
const NftBuyInputAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > img {
    width: 20px;
    height: 20px;
  }

  & .title {
    font-size: 15px;
    font-weight: 700;
  }
  & .description {
    font-size: 13px;
    font-weight: 400;
  }
`
const NftBuyInputAmount = styled.span``

interface Props {
  nftAsset: any //  TODO: TBD
  token?: AssetType
  nftAmount: number
  price: number
  open: boolean
  isCreditCard?: boolean
  setOpen: (open: boolean) => void
}

const NftBuyModal: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  nftAsset,
  token,
  nftAmount,
  price,
  isCreditCard,
}) => {
  const steps = ['Review', 'Pay', 'Result']
  const [currentStep, setCurrentStep] = useState(0)
  const [tokenUSDRate, setTokenUSDRate] = useState(0)

  const tokenAmount: BigNumber = useMemo(
    () => calcToAmount(new BigNumber(nftAmount), price, tokenUSDRate),
    [nftAmount, price, tokenUSDRate],
  )

  useEffect(() => {
    setCurrentStep(0)
  }, [open])
  useEffect(() => {
    if (token?.coingeckoId) {
      getUSDRateByCoingeckoId(token.coingeckoId).then((rate): void => setTokenUSDRate(rate))
    }
  }, [token])

  const handleNextStep = (): void => setCurrentStep((step) => step + 1)

  const renderReviewStep = (): JSX.Element => (
    <>
      <NftBuyPanel>
        <NftBuyInput>
          <NftBuyInputAsset>
            <img src={nftAsset.image} alt='' />
            <div className='d-flex flex-column'>
              <span>{nftAsset.symbol}</span>
              <span className='description'>{nftAmount > 1 ? `${nftAmount} items` : `# ${nftAsset.id}`}</span>
            </div>
          </NftBuyInputAsset>
          <NftBuyInputAmount>${displayTokenAmount(new BigNumber(price * nftAmount), 2)}</NftBuyInputAmount>
        </NftBuyInput>
        <NftBuyInput>
          <NftBuyInputAsset>
            <img src={isCreditCard ? CashIcon : token!.logoURIs.png} alt='' />
            <div className='d-flex flex-column'>
              {isCreditCard && <span>CASH</span>}
              <span className='description'>{isCreditCard ? 'using Ramp (including fee)' : token!.symbol}</span>
            </div>
          </NftBuyInputAsset>
          {!isCreditCard && <NftBuyInputAmount>{displayTokenAmount(new BigNumber(tokenAmount), 2)}</NftBuyInputAmount>}
        </NftBuyInput>
        <OverlayDiv className='d-flex justify-content-center align-itmes-center'>using</OverlayDiv>
      </NftBuyPanel>
    </>
  )

  const renderSignStep = (): JSX.Element =>
    isCreditCard ? (
      <CircleCheckoutStep nftAsset={nftAsset} handleFinished={handleNextStep} />
    ) : (
      <SignStep status={TXStatus.PENDING} />
    )

  const renderResultStep = (): JSX.Element => (
    <SignStep
      status={TXStatus.SUCCESS}
      customDesc={
        isCreditCard
          ? `You bought ${nftAsset.symbol} #${nftAsset.id} using Ramp`
          : `You bought ${nftAsset.symbol} #${nftAsset.id} using ${displayTokenAmount(new BigNumber(tokenAmount), 2)} ${
              token!.symbol
            }`
      }
    />
  )

  if (!nftAsset || !open) {
    return null
  }
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
      <Container style={{ padding: '1.5rem 0rem 2rem' }}>
        <StepsTransactions
          className='px-4 pb-4'
          steps={steps}
          currentStepNo={currentStep}
          style={{ margin: 'auto 2rem' }}
        />

        {currentStep === 0 && renderReviewStep()}
        {currentStep === 1 && renderSignStep()}
        {currentStep === 2 && renderResultStep()}

        {currentStep === 0 && (
          <NextStep onClick={handleNextStep}>
            <img src={NextStepIcon} alt='next-step' />
          </NextStep>
        )}
      </Container>
    </ModalWrapper>
  )
}

export default NftBuyModal
